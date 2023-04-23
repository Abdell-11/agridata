import { useRouter } from "next/router";
import { api } from "~/utils/api";
import type { sensorData } from "@prisma/client";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
};




const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const SensorDataPage = ({
  dataName,
  data,
}: 

    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error || !sensors) {
      return null;
    }
    switch (dataName) {
      case "gas":
        return sensors.gas;
      case "temperature":
        return sensors.temperature;
      case "soil":
        return sensors.soil;
      case "pressure":
        return sensors.pressure;
      case "humidity":
        return sensors.humidity;
      default:
        return null;
    }
  //  }

   const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => Math.random() * 100) ,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <strong><div>
      <h1>{dataName} Data</h1>
      <Line options={options} data={data} />
    </div></strong>
  );
};


export default SensorDataPage;
