import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
