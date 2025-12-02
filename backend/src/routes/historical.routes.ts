import { Router } from "express";

import { authenticateToken } from "../middleware/authenticateToken";
import { getHistorical } from "../controllers/historical.controller";

const router = Router();

router.get("/historical/:symbol", authenticateToken, getHistorical);

export default router;
