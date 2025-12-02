import { Router } from "express";

import { login, logout } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);

// SOMETHING LIKE /me
router.get("/check", authenticateToken, (_req, res) => {
  res.json({ loggedIn: true, user: (_req as any).user });
});

export default router;
