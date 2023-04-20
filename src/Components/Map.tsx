import { useState, useMemo } from 'react';
import type { sensorData } from "@prisma/client";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import { api } from "~/utils/api";
import Pin from './pin';

import CITIES from '../assets/cities.json';


const TOKEN = 'pk.eyJ1IjoibW91cmFiaXRpeml5YWQiLCJhIjoiY2xnbGZkNXR3MDB0MDNkdWd1YTBueTFydiJ9.QqADo0TtRSPzzJgupGcpyA'; // Set your mapbox token here

const TestMap = () => {
  const [popupInfo, setPopupInfo] = useState<sensorData | undefined>();
  const { data: AllData } = api.sensorData.getLatestDataPerNode.useQuery();
  const { data: NodeData, mutateAsync: fetchById } = api.sensorData.getLatestDataByNode.useMutation();

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
            console.log(index);
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
        latitude: 33.543640,
        longitude: -5.109508,
        zoom: 16
      }}
      style={{ width: '100%', height: '100vh' }}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {
        AllData && AllData.map((sensor, index) => (
          <Marker
            key={`marker-${index}`}
            longitude={sensor.longitude}
            latitude={sensor.latitude}
            anchor="bottom"
            closeOnClick={true}
            onClick={e => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();

              setPopupInfo(sensor);
              console.log(index);
            }}
          >
            <Pin />
          </Marker>
        ))
      }

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(undefined)}
        >
          {

            [
              {
                "name": "Node ID",
                "value": popupInfo.node
              },
              {
                "name": "Temperature",
                "value": popupInfo.temperature
              },
              {
                "name": "Humidity",
                "value": popupInfo.humidity
              },
              {
                "name": "Pressure",
                "value": popupInfo.pressure
              },
              {
                "name": "Soil Moisture",
                "value": popupInfo.soil
              },
              {
                "name": "Gas",
                "value": popupInfo.gas
              } 
            ]
            .filter(item => !isNaN(item.value))
            .map((item, index) => (
              <p
                key={index}
              >
                {item.name} : {item.value}
              </p>
            ))
          }
          {/* <img width="100%" src={popupInfo.image} /> */}
        </Popup>
      )}
    </Map>
  );
}

export default TestMap;