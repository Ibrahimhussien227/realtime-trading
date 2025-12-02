import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import { useRealtimeData } from "@/hooks/useRealtimeDataChart";

Chart.register(...registerables);

interface RealtimeChartProps {
  symbol: string;
}

export default function RealtimeChart({
  symbol,
}: RealtimeChartProps) {
  const data = useRealtimeData(symbol) || [];

  const chartData = {
    labels: data.map((p) =>
      new Date(p.ts).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    ),
    datasets: [
      {
        label: symbol,
        data: data.map((p) => p.price),
        fill: false,
        tension: 0.2,
      },
    ],
  };

  return (
    <div>
      <h2>{symbol} — Live</h2>
      <Line data={chartData} />
      <div className="mt-5">Points: {data.length}</div>
    </div>
  );
}
