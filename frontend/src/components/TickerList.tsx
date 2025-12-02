type T = {
  symbol: string;
  price: number;
  change: number;
  ts: number;
};
export default function TickerList({
  tickers,
  selected,
  onSelect,
}: {
  tickers: T[];
  selected?: string | null;
  onSelect: (s: string) => void;
}) {
  return (
    <div className="ticker-list">
      {tickers.map((t) => (
        <div
          key={t.symbol}
          className={
            "ticker-item" + (selected === t.symbol ? " active" : "")
          }
          onClick={() => onSelect(t.symbol)}
        >
          <div>{t.symbol}</div>
          <div>{t.price.toFixed(2)}</div>
          <div
            className={"change " + (t.change >= 0 ? "up" : "down")}
          >
            {t.change >= 0 ? "+" : ""}
            {t.change.toFixed(4)}
          </div>
        </div>
      ))}
    </div>
  );
}
