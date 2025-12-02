import { useEffect } from "react";

import { useWSStore } from "@/store/ws/useWSStore";
import { getHistorical, type Point } from "@/api/historical";

export function useRealtimeData(symbol: string) {
  const { chartData, addPoint } = useWSStore();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const hist: Point[] = await getHistorical(symbol);

        if (!cancelled) {
          addPoint(hist);
        }
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [symbol]);

  return chartData;
}
