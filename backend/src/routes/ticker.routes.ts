import { Router } from "express";

import { authenticateToken } from "../middleware/authenticateToken";
import { getTickers } from "../controllers/ticker.controller";

const router = Router();

router.get("/tickers", authenticateToken, getTickers);

export default router;
