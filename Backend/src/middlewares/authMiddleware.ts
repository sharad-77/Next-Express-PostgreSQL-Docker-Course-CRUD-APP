import dotenv from 'dotenv';
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config();

const JWTSECRET = process.env.JWT_SECRET!;

export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
  try{
  const authHeader = req.headers['authorization'];

  if(!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No Token Provided"});
  }

  const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWTSECRET) as JwtPayload;
    (req as any).user = decoded;
    next();
  } catch(error){
    return res.status(401).json({ message : "Invalid or Expired token"});
  }
}
