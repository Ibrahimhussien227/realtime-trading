import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import tickersRoutes from "./routes/ticker.routes";
import historicalRoutes from "./routes/historical.routes";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:4173",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", tickersRoutes);
app.use("/api", historicalRoutes);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

export default app;
