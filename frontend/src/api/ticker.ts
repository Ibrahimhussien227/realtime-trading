import type { Ticker } from "@/store/ws/types";

const API = import.meta.env.VITE_API_URL;

export async function getTickers(): Promise<Ticker[]> {
  const res = await fetch(`${API}/tickers`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tickers");
  }

  return res.json();
}
