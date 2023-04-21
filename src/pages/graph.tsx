import { useRouter } from "next/router";
// import  {type GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { api } from "~/utils/api";
import type { sensorData } from "@prisma/client";
// import { createClient } from '@supabase/supabase-js'
import axios from 'axios'

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


// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const dataName = context.query.dataName as string
//   const supabase = createClient('https://arbotauyvnobapaukzfi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyYm90YXV5dm5vYmFwYXVremZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA3Mzg2NjksImV4cCI6MTk5NjMxNDY2OX0.gGP7TkmkwurTbsWfOxt9umZYiKXb2Jp4cmKjnnK-dUg')
//   const { data, error } = await supabase
//   .from('sensordata')
//   .select('*')
//   .eq('node_id', 1)
//   .order('created_at', { descending: true })

//   if (error) {
//     console.log(error)
//     return {
//       notFound: true,
//     }
//   }
//   return {
//     props: { dataName, data }, // will be passed to the page component as props
//   }
// }

axios.get('../api/sensorData/graphData')
  .then(response => {
    // handle success
    console.log(response.data);
  })
  .catch(error => {
    // handle error
    console.log(error);
  });


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
// InferGetServerSidePropsType<typeof getServerSideProps>) => {

  //const { data: sensors, isLoading, error } = api.sensorData.graphData.useQuery();
  
  // const dataHelper = (dataName?: "gas" | "temperature" | "soil" | "pressure" | "humidity") => {
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
