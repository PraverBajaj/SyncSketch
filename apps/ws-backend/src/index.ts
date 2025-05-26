import WebSocket, { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import {prismaclient} from "@repo/db/client"
const wss = new WebSocketServer({ port: 8080 });


interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

function checkuser(token: string): string | null {
  const decoded = jwt.verify(token as string, JWT_SECRET);
  if (typeof decoded == "string") {
    return null;
  }
  if (!decoded) {
    return null;
  } else {
    return decoded.userId;
  }
}
wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url) {
    console.error("No URL found in request");
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";

  const userId = checkuser(token);

  if (!userId) {
    ws.close();
    return;
  }

  users.push({
  ws,
  rooms: [],
  userId,
});

  ws.on("message", async (data) => {
    const parseddata = JSON.parse(data as unknown as string);
    if (parseddata.type == "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parseddata.roomId);
    }
    if (parseddata.type == "leave_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms == user?.rooms.filter((x) => x !== parseddata.roomId);
    }
    if (parseddata.type == "chat") {
      const roomId = parseddata.roomId;
      const message = parseddata.message;
      await prismaclient.chat.create({
        data: {
          roomId,
          message,
          userId
        }
      })
      
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId: roomId,
            })
          );
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
