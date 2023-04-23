import { useState, useMemo } from "react";
import type { sensorData } from "@prisma/client";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import { api } from "~/utils/api";
import Pin from "./pin";

import CITIES from "../assets/cities.json";

const TOKEN =
  "pk.eyJ1IjoibW91cmFiaXRpeml5YWQiLCJhIjoiY2xnbGZkNXR3MDB0MDNkdWd1YTBueTFydiJ9.QqADo0TtRSPzzJgupGcpyA"; // Set your mapbox token here

const TestMap = () => {
  const [popupInfo, setPopupInfo] = useState<sensorData | undefined>();
  const { data: AllData } = api.sensorData.getLatestDataPerNode.useQuery();
  const { data: NodeData, mutateAsync: fetchById } =
    api.sensorData.getLatestDataByNode.useMutation();
  function getUnit(name: string): string {
    switch (name) {
      case "Node ID":
        return "";
      case "Temperature":
        return "°C";
      case "Humidity":
        return "%";
      case "Pressure":
        return "hPa";
      case "Soil Moisture":
        return "%";
      case "Gas":
        return "ppm";
      case "Last Update":
        return "";
      default:
        return "";
    }
  }

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <Map
      interactive
      mapStyle={"mapbox://styles/mourabitiziyad/ck7yovgch176o1ioj63okiw14"}
      mapboxAccessToken={TOKEN}
      initialViewState={{
        latitude: 33.54364,
        longitude: -5.109508,
        zoom: 16,
      }}
      style={{ width: "100%", height: "100vh" }}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {AllData &&
        AllData.map((sensor, index) => (
          <Marker
            key={`marker-${index}`}
            longitude={sensor.longitude}
            latitude={sensor.latitude}
            anchor="bottom"
            closeOnClick={true}
            onClick={(e) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();

              setPopupInfo(sensor);
              console.log(index);
            }}
          >
            <Pin />
          </Marker>
        ))}

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(undefined)}
        >
          {[
            {
              name: "Node ID",
              value: popupInfo.node,
            },
            {
              name: "Temperature",
              value: popupInfo.temperature,
            },
            {
              name: "Humidity",
              value: popupInfo.humidity,
            },
            {
              name: "Pressure",
              value: popupInfo.pressure,
            },
            {
              name: "Soil Moisture",
              value: popupInfo.soil,
            },
            {
              name: "Gas",
              value: popupInfo.gas,
            },
            {
              name: "Last Update",
              value: new Date(popupInfo.createdat).toLocaleString(),
            },
          ]
            .filter((item) => !isNaN(item.value) || item.name === "Last Update")
            .map((item, index) => (
              <p key={index}>
                <strong>{item.name} :</strong> {item.value} {getUnit(item.name)}
              </p>
            ))}
        </Popup>
      )}
    </Map>
  );
};

export default TestMap;
