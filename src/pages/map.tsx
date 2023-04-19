import TestMap from "~/Components/Map"
import Sidebar from "~/Components/Sidemenu";

const MapPage = () => {
  return (
    <div className="flex min-h-screen">
    <Sidebar />
    <>
      <TestMap />
    </>
    </div>
  )
}

export default MapPage;