import { Market } from "./market";

test("market updates tickers", (done) => {
  const m = new Market(["AAPL"]);
  let seen = 0;
  m.on("tick", (t) => {
    expect(t.symbol).toBe("AAPL");
    seen++;
    if (seen === 3) {
      m.stop();
      done();
    }
  });
  m.start(10);
});
