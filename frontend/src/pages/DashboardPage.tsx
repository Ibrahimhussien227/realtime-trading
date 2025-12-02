import { Suspense, lazy } from "react";

import TickerList from "@/components/TickerList";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { useTickers } from "@/hooks/useTickers";

const RealtimeChart = lazy(
  () => import("@/components/charts/RealtimeChart")
);

const DashboardPage = () => {
  const { tickers, selected, setSelected } = useTickers();

  return (
    <div className="sm:h-screen bg-background text-foreground flex flex-col">
      {/* Main content */}
      <main className="flex flex-col sm:flex-row flex-1 overflow-hidden p-4 gap-4">
        {/* Tickers */}
        <section className="w-full sm:w-96">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Tickers</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <div className="flex flex-col gap-2 p-2">
                <TickerList
                  tickers={tickers}
                  onSelect={setSelected}
                  selected={selected}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Chart */}
        <section className="flex-1">
          {selected ? (
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{selected} Chart</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <Suspense fallback={<div>Loading chart...</div>}>
                  <RealtimeChart symbol={selected} />
                </Suspense>{" "}
              </CardContent>
            </Card>
          ) : (
            <div className="text-center text-muted mt-10">
              Select a ticker
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
