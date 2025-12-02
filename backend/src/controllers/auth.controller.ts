import { Request, Response } from "express";

import { generateToken } from "../utils/jwt";
import { users } from "../data/users";

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 3600000,
  });

  res.status(200).json({ message: "Logged in successfully" });
};

export const logout = (_req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 0,
  });

  res.status(200).json({ message: "Logged out successfully" });
};
