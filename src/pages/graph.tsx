import SensorDataGraph from "../Components/Graph";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const SensorDataPage = ({ initialData }) => {
  const router = useRouter();
  const dataName = router.query.dataName as string;

  return (
    <div>
      <h1>{dataName} Data</h1>
      <SensorDataGraph dataName={dataName} initialData={initialData} />
    </div>
  );
};

SensorDataPage.getInitialProps = async ({ query }) => {
  const { dataName } = query;
  const res = await api.query("sensorData.graphData", {});

  if (res.status === "success" && res.data && dataName && res.data[dataName]) {
    return { initialData: res.data[dataName] };
  } else {
    return { initialData: [] };
  }
};

export default SensorDataPage;
