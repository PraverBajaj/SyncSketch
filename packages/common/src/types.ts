import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(1).max(20),
    password: z.string().min(8).max(20),
    email: z.string().email(),
})

export const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
})

export const roomSchema = z.object({
    slug: z.string().min(1).max(20),
})