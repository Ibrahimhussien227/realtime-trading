import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "../types";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("JWT_SECRET is missing");

export const generateToken = (user: User): string => {
  const payload: JwtPayload = {
    id: user.id,
    email: user.email,
  };

  const options: SignOptions = { expiresIn: "1h" };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token?: string): JwtPayload => {
  if (!token) throw new Error("Unauthorized");

  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    throw new Error("Invalid token");
  }
};
