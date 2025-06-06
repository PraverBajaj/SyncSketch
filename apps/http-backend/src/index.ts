import express from "express";
import jwt from "jsonwebtoken";
import { auth } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import bcrypt from "bcrypt";
import {
  CreateSignupSchema,
  CreateSignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());


// -------- SIGNUP --------
app.post("/signup", async (req, res) => {
  const parsedData = CreateSignupSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({ warning: "Invalid signup input" });
     return
  }

  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        password: hashedPassword,
        name: parsedData.data.name,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      userId: user.id,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    res.status(409).json({
      warning: "User creation failed. Possibly email already exists.",
    });
  }
});

// -------- SIGNIN --------
app.post("/signin", async (req, res) => {
  const parsedData = CreateSignInSchema.safeParse(req.body);
  if (!parsedData.success) {
     res.status(400).json({ warning: "Invalid signin input" })
     return;
  }

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });

    if (!user) {
      res.status(401).json({ warning: "Unauthorized: User not found" });
      return;
    }

    const validPassword = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );

    if (!validPassword) {
      res.status(401).json({ warning: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET as string);
    res.json({ token });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ warning: "Error while signing in" });
  }
});

// -------- CREATE ROOM --------
app.post("/createroom", auth, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);

  if (!parsedData.success) {
      res.status(400).json({
      warning: "Invalid room data",
      error: parsedData.error,
      
    })
    return ;
  }

  // @ts-ignore
  const userId = req.userId;

  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.slug,
        adminId: userId || "",
      },
    });

    res.status(201).json({ roomId: room.id });
  } catch (error) {
    console.error("Create room error:", error);
    res.status(500).json({ warning: "Error while creating room" });
  }
});

// -------- GET ROOMS --------
app.get("/rooms", auth, async (req, res) => {
  try {
    const rooms = await prismaClient.room.findMany({
      where: {
        // @ts-ignore
        adminId: req.userId,
      },
    });

    res.status(200).json({ rooms });
  } catch (error) {
    console.error("Fetch rooms error:", error);
    res.status(500).json({ warning: "Error fetching rooms" });
  }
});

// -------- GET USERNAME --------
app.get("/username", auth, async (req, res) => {
  try {
    const users = await prismaClient.user.findMany({
      where: {
        // @ts-ignore
        id: req.userId,
      },
    });

    res.json({ username: users });
  } catch (error) {
    console.error("Fetch username error:", error);
    res.status(500).json({ warning: "Error fetching username" });
  }
});

// -------- GET CHATS --------
app.get("/chats/:roomId", auth, async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);

    const messages = await prismaClient.chat.findMany({
      where: { roomId },
      orderBy: { id: "desc" },
      take: 50,
    });

    res.json({ messages });
  } catch (error) {
    console.error("Fetch chats error:", error);
    res.status(500).json({ warning: "Error fetching chat messages" });
  }
});

// -------- GET SHAPE MOVEMENTS --------
app.get("/shapeMovements/:roomId", auth, async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);

    const movements = await prismaClient.shapeMovement.findMany({
      where: { roomId },
      orderBy: { createdAt: "desc" },
      distinct: ["shapeIndex"],
    });

    res.json({ movements });
  } catch (error) {
    console.error("Fetch shape movements error:", error);
    res.status(500).json({ warning: "Error fetching shape movements" });
  }
});

// -------- SERVER LISTEN --------
app.listen(3009, () => {
  console.log("Server running on http://localhost:3009");
});


