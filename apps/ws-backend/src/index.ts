import { WebSocketServer } from "ws";
import * as jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/config";  
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws , request) => {
   const url = request.url;
   if (!url) {
        console.error("No URL found in request");
        return;
   }
   const queryParams = new URLSearchParams(url.split("?")[1]);
   const token = queryParams.get("token");
   const decoded = jwt.verify(token as string, JWT_SECRET );
   if (!decoded ) {
        console.error("Invalid token");
        ws.close();
        return;
   }
   else {
  console.log("New client connected");
   }

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Hello! You sent -> ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});