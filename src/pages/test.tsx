import { type NextPage } from "next";
import { api } from "~/utils/api";

const Home: NextPage = () => {
    const {data} = api.sensorData.getLatestDataPerNode.useQuery();
    return (
        <p>{JSON.stringify(data, null, 2)}</p>
    )
}

export default Home;
