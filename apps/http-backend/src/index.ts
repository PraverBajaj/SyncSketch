import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { middleware } from "./middleware";
import {JWT_SECRET} from "@repo/backend-common/config";
import { SigninSchema } from "@repo/common/types";
import { roomSchema } from "@repo/common/types";
import { createUserSchema } from "@repo/common/types";
dotenv.config();

const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {
    // db call to create user
    // if user already exists, return error
    // if user is created successfully, return success
  res.send("you are signed up");
});

app.post("/signin", (req, res) => {
  const username = "111";
  const password = "222";
  if (process.env.JWT_SECRET === undefined) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ username }, JWT_SECRET);
  res.send("you are logged in" + token);
});

app.post("create-room", middleware, (req, res) => {
    // db call to create room
    res.json({
        roomId: "123",
        roomName: "room name",
    }
)});

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
