export type Point = { ts: number; price: number };

const API = import.meta.env.VITE_API_URL;

export async function getHistorical(
  symbol: string
): Promise<Point[]> {
  const res = await fetch(`${API}/historical/${symbol}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch historical data for ${symbol}`);
  }

  return res.json();
}
