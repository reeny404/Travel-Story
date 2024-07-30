"use client";

import { LatLng } from "@/types/LatLng";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import React, { useState } from "react";

const KEY: string = process.env.MAP_API_KEY ?? "";
type props = { locations: LatLng[] };

function Map({ locations }: props) {
  const [isInit, setIsInit] = useState<boolean>(false);
  const center: LatLng = getCenter(locations);

  const handleOnLoad = () => setIsInit(true);

  return (
    <LoadScript googleMapsApiKey={KEY} onLoad={handleOnLoad}>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100vh",
        }}
        center={center}
        zoom={7}
      >
        {locations.map((location, i) =>
          isInit ? (
            <Marker
              key={i}
              position={location}
              label={i + ""}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#e08181",
                fillOpacity: 1,
                scale: 10,
                strokeColor: "black",
                strokeWeight: 2,
              }}
            />
          ) : (
            <Marker key={i} position={location} label={i + ""}></Marker>
          )
        )}
        <Polyline
          path={locations}
          options={{
            strokeColor: "#535353",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);

function getCenter(locations: LatLng[]): LatLng {
  let lat = 0,
    lng = 0;
  const length = locations.length;
  for (let i = 0; i < length; i++) {
    const item = locations[i];
    lat += item.lat;
    lng += item.lng;
  }

  return { lat: lat / length, lng: lng / length };
}
