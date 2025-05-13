import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function middleware(req: Request, res: Response, next: NextFunction) {
 const token = req.headers['authorization'] ?? " ";
 const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string)
 if (decoded) {
    // @ts-ignore
   req.username = (decoded as any).username
   next();
 } else {
   res.status(401).send('Unauthorized');
 }
}