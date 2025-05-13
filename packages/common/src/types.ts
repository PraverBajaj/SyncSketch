import { z } from 'zod';

export const createUserSchema = z.object({
    username: z.string().min(1).max(20),
    password: z.string().min(8).max(20),
    email: z.string().email(),
})

export const SigninSchema = z.object({
    username: z.string().min(1).max(20),
    password: z.string().min(8).max(20),
})

export const roomSchema = z.object({
    roomname: z.string().min(1).max(20),
})