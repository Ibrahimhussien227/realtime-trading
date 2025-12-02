import { Request, Response } from "express";

import { market } from "../market";

export const getTickers = (_req: Request, res: Response) => {
  const list = market.getSymbols().map((s) => market.getTicker(s));
  res.json(list);
};
