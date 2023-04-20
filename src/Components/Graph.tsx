import { useEffect, useState } from "react";
import { Line, ChartData } from "react-chartjs-2";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

type DataPoint = {
  value: number;
  createdat: string;
};

type SensorDataGraphProps = {
  dataName: string;
  initialData: DataPoint[];
};

const SensorDataGraph = ({ dataName, initialData }: SensorDataGraphProps) => {
  const [chartData, setChartData] = useState<Chart.ChartData>();

  useEffect(() => {
    if (initialData && dataName) {
      const latestData = initialData.slice(-20);
      const labels = latestData.map((point: DataPoint) =>
        new Date(point.createdat).toLocaleDateString()
      );
      const dataPoints = latestData.map((point: DataPoint) => point.value);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: dataName,
            data: dataPoints,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    }
  }, [initialData, dataName]);

  return (
    <div>
      {chartData && (
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Value",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default SensorDataGraph;
