import { Request, Response } from "express";

import { generateHistorical } from "../market/historical";
import { Point } from "../types/market";

const historicalCache = new Map<string, Point[]>();

export const getHistorical = (req: Request, res: Response) => {
  const symbol = req.params.symbol;

  if (historicalCache.has(symbol))
    return res.json(historicalCache.get(symbol));

  const hist = generateHistorical(symbol, 240);
  historicalCache.set(symbol, hist);
  res.json(hist);
};
