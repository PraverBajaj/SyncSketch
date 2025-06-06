import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET as string);
    if (typeof decodedToken === "string" || !decodedToken.userId) {
      return null;
    }
    return decodedToken.userId;
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
}

wss.on("connection", (ws, request) => {
  try {
    const url = request.url;
    if (!url) {
      ws.close();
      return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");
    const userId = checkUser(token as string);
    if (!userId) {
      ws.close();
      return;
    }

    const user: User = { ws, rooms: [], userId };
    users.push(user);

    ws.on("message", async (data) => {
      try {
        let parsedData;
        if (typeof data !== "string") {
          parsedData = JSON.parse(data.toString());
        } else {
          parsedData = JSON.parse(data);
        }

        const type = parsedData?.type;
        if (!type) {
          console.warn("Received message without type:", parsedData);
          return;
        }

        switch (type) {
          case "join_room":
            if (!parsedData.roomId) {
              console.warn("Missing roomId for join_room");
              return;
            }
            user.rooms.push(parsedData.roomId);
            break;

          case "leave":
            if (!parsedData.room) {
              console.warn("Missing room for leave");
              return;
            }
            user.rooms = user.rooms.filter((room) => room !== parsedData.room);
            break;

          case "chat":
            if (!parsedData.roomId || !parsedData.message) {
              console.warn("Missing fields in chat message");
              return;
            }
            await prismaClient.chat.create({
              data: {
                message: parsedData.message,
                roomId: Number(parsedData.roomId),
                userId,
              },
            });
            users.forEach((u) => {
              if (u.rooms.includes(parsedData.roomId)) {
                u.ws.send(
                  JSON.stringify({
                    type: "chat",
                    message: parsedData.message,
                    roomId: parsedData.roomId,
                  })
                );
              }
            });
            break;

          case "move":
            if (!parsedData.roomId || !parsedData.message) {
              console.warn("Missing fields in move message");
              return;
            }

            try {
              const moveData = JSON.parse(parsedData.message);
              await prismaClient.shapeMovement.create({
                data: {
                  roomId: Number(parsedData.roomId),
                  userId,
                  shapeIndex: moveData.index,
                  shapeData: JSON.stringify(moveData.newShape),
                },
              });

              users.forEach((u) => {
                if (u.rooms.includes(parsedData.roomId)) {
                  u.ws.send(
                    JSON.stringify({
                      type: "move",
                      message: parsedData.message,
                      roomId: parsedData.roomId,
                    })
                  );
                }
              });
            } catch (err) {
              console.error("Invalid move payload:", err);
            }
            break;

          default:
            console.warn("Unknown message type received:", type);
        }
      } catch (err) {
        console.error("Error handling message:", err);
      }
    });

    ws.on("close", () => {
      const index = users.findIndex((u) => u.ws === ws);
      if (index !== -1) {
        users.splice(index, 1);
      }
    });
  } catch (err) {
    console.error("Error during connection setup:", err);
    ws.close();
  }
});
