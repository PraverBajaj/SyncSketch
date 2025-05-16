import express from "express";
import jwt from "jsonwebtoken";
import dotenv, { parse } from "dotenv";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { SigninSchema, roomSchema, createUserSchema } from "@repo/common/types";
import { prismaclient } from "@repo/db/client";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/signup", async (req: any, res: any) => {
  try {
    const parsedata = createUserSchema.safeParse(req.body);
    if (!parsedata.success) {
      return res.status(400).json({
        message: "Invalid data",
        errors: parsedata.error.errors,
      });
    }
    const { name, email, password } = parsedata.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = req.body.avatar || null;
    const user = await prismaclient.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    } else {
      await prismaclient.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          avatar,
        },
      });
    }
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/signin", async (req: any, res: any) => {
  try {
    const parsedata = SigninSchema.safeParse(req.body);
    if (!parsedata.success) {
      return res.status(400).json({
        message: "Invalid data",
        errors: parsedata.error.errors,
      });
    }
    const { email, password } = parsedata.data;
    const user = await prismaclient.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.send("you are logged in " + token);
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error " + e,
    });
    console.log("Internal Server error " + e);
  }
});

app.post("/createroom", middleware, async (req : any, res : any ) => {
  const parsedata = roomSchema.safeParse(req.body)
    if (!parsedata.success) {
      return res.status(400).json({
        message: "Invalid data",
        errors: parsedata.error.errors,
      });
    }
    // @ts-ignore
    const userId = req.userId
   
  const room = await prismaclient.room.create({
    data : {
      slug : parsedata.data.slug,
      adminId : userId
    }
  })
  res.json({
    roomId: room.id,
  });
});

app.listen(3009, () => {
  console.log("Server is running on port 3000");
});
