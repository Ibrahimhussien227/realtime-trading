import { EventEmitter } from "events";

import { Ticker } from "../types/market";

const BASES: Record<string, number> = {
  AAPL: 175,
  TSLA: 195,
  "BTC-USD": 87022.48,
  "ETH-USD": 2806.1,
  "BNB-USD": 831.24,
  "LEO-USD": 9.8361,
  "SOL-USD": 127.16,
  "STETH-USD": 2803.08,
  "WBTC-USD": 86831.32,
  "XRP-USD": 2.0141,
};

export class Market extends EventEmitter {
  tickers: Record<string, Ticker> = {};
  intervalId?: NodeJS.Timeout;

  constructor(symbols: string[]) {
    super();
    const now = Date.now();
    for (const s of symbols) {
      const base = BASES[s] ?? 100;
      this.tickers[s] = {
        symbol: s,
        price: base,
        change: 0,
        ts: now,
      };
    }
  }

  start(intervalMs = 500) {
    this.intervalId = setInterval(() => this.step(), intervalMs);
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  step() {
    const now = Date.now();
    for (const s of Object.keys(this.tickers)) {
      const t = this.tickers[s];
      // Random walk
      const pct = (Math.random() - 0.5) * 0.002;
      const old = t.price;
      const next = Math.max(0.01, +(old * (1 + pct)).toFixed(6));
      t.change = +(next - old).toFixed(6);
      t.price = next;
      t.ts = now;
      this.emit("tick", { ...t });
    }
  }

  getSymbols() {
    return Object.keys(this.tickers);
  }

  getTicker(symbol: string) {
    return this.tickers[symbol];
  }
}

export const market = new Market([
  "BTC-USD",
  "AAPL",
  "TSLA",
  "BTC-USD",
  "BNB-USD",
  "LEO-USD",
  "SOL-USD",
  "STETH-USD",
  "WBTC-USD",
  "XRP-USD",
]);
market.start(1000);
