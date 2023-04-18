// @ts-ignore
import * as React from 'react';
import { useState, useMemo } from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';

import Pin from './pin';

import CITIES from '../assets/cities.json';

const TOKEN = 'pk.eyJ1IjoibW91cmFiaXRpeml5YWQiLCJhIjoiY2xnbGZkNXR3MDB0MDNkdWd1YTBueTFydiJ9.QqADo0TtRSPzzJgupGcpyA'; // Set your mapbox token here

const TestMap = () => {
  const [popupInfo, setPopupInfo] = useState(null);

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
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  const geojson = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Point', coordinates: [-5.105036, 33.544402] } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [-5.110036, 33.538402] } },
    ]
  };

  return (
    <Map
      interactive
      mapStyle={"mapbox://styles/mourabitiziyad/ck7yovgch176o1ioj63okiw14"}
      mapboxAccessToken={TOKEN}
      initialViewState={{
        longitude: -5.105036,
        latitude: 33.539402,
        zoom: 16
      }}
      style={{ width: '100%', height: '100vh' }}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {pins}

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            {popupInfo.city}, {popupInfo.state} |{' '}
            <a
              target="_new"
              href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
            >
              Wikipedia
            </a>
          </div>
          {/* <img width="100%" src={popupInfo.image} /> */}
        </Popup>
      )}
    </Map>
  );
}

export default TestMap;