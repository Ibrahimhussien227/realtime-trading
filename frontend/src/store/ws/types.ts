// src/store/types.ts

export type Ticker = {
  symbol: string;
  price: number;
  change: number;
  ts: number;
};

export type Point = { ts: number; price: number };

export type WSStore = {
  tickers: Ticker[];
  selected: string | null;
  chartData: Point[];

  updateTicker: (t: Ticker[]) => void;
  addPoint: (point: Point | Point[]) => void;
  setSelected: (symbol: string) => void;
  connectWS: () => void;
  disconnectWS: () => void;
};
