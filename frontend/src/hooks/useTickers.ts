import { useEffect } from "react";

import { useWSStore } from "@/store/ws/useWSStore";
import type { Ticker } from "@/store/ws/types";
import { getTickers } from "@/api/ticker";

export function useTickers() {
  const { tickers, updateTicker, setSelected, selected } =
    useWSStore();

  useEffect(() => {
    (async () => {
      try {
        const list: Ticker[] = await getTickers();

        updateTicker(list);
        if (!selected && list.length) setSelected(list[0].symbol);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return { tickers, selected, setSelected };
}
