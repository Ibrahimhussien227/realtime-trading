import { create } from "zustand";

import type { Point, Ticker, WSStore } from "./types";

const WS_URL = import.meta.env.VITE_WS_URL;

let ws: WebSocket | null = null;

export const useWSStore = create<WSStore>((set, get) => ({
  tickers: [],
  chartData: [],
  selected: null,

  updateTicker: (incoming: Ticker | Ticker[]) =>
    set((state) => {
      const list = Array.isArray(incoming) ? incoming : [incoming];

      const map = new Map(state.tickers.map((t) => [t.symbol, t]));
      list.forEach((t) => map.set(t.symbol, t));

      return { tickers: Array.from(map.values()) };
    }),

  addPoint: (points: Point | Point[]) =>
    set((state) => {
      const newPoints = Array.isArray(points) ? points : [points];

      const combined = [...state.chartData, ...newPoints];
      const map = new Map<number, Point>();
      combined.forEach((p) => map.set(p.ts, p));

      return { chartData: Array.from(map.values()).slice(-240) };
    }),

  setSelected: (symbol) => set({ selected: symbol }),

  connectWS: () => {
    if (
      ws?.readyState === WebSocket.OPEN ||
      ws?.readyState === WebSocket.CONNECTING
    )
      return;

    ws = new WebSocket(WS_URL);

    ws.onmessage = (ev) => {
      try {
        const parsed = JSON.parse(ev.data);
        if (parsed.type === "tick" || parsed.type === "snapshot") {
          const payload = parsed.payload;
          if (!payload) return;

          get().updateTicker(payload);
          if (payload.symbol === get().selected) {
            get().addPoint({ ts: payload.ts, price: payload.price });
          }
        }
      } catch (err) {
        console.error("WS parse error:", err);
      }
    };

    ws.onopen = () => console.log("WS connected");
    ws.onclose = () => console.log("WS disconnected");
  },

  disconnectWS: () => {
    ws?.close();
    ws = null;
  },
}));
