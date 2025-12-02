export function generateHistorical(symbol: string, points = 200) {
  const now = Date.now();
  const data = [];
  let price =
    symbol === "BTC-USD" ? 52000 : symbol === "AAPL" ? 175 : 195;
  for (let i = points - 1; i >= 0; i--) {
    const ts = now - i * 60_000;
    const changePct = (Math.random() - 0.5) * 0.01;
    price = price * (1 + changePct);
    data.push({ ts, price: Math.round(price * 1e6) / 1e6 });
  }
  return data;
}
