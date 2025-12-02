import { Response, NextFunction } from "express";

import { AuthenticatedRequest } from "../types";
import { verifyToken } from "../utils/jwt";

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;
  if (!token)
    return res.status(401).json({ message: "No token provided" });

  try {
    const user = verifyToken(token);

    req.user = user;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired token" });
  }
};
