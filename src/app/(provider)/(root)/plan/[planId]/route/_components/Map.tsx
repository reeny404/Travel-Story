"use client";

import { LatLng } from "@/types/LatLng";
import { LatLngUtil } from "@/utils/LatLngUtil";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import React, { useCallback, useMemo, useState } from "react";

const KEY: string = process.env.NEXT_PUBLIC_MAP_API_KEY!;
type props = { locations: LatLng[] };

function Map({ locations }: props) {
  const [isInit, setIsInit] = useState<boolean>(false);
  const center: LatLng = useMemo(
    () => LatLngUtil.calculateCenter(locations),
    [locations]
  );

  const handleOnLoad = useCallback(() => setIsInit(true), []);
  const markerProps = isInit
    ? {
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#e08181",
          fillOpacity: 1,
          scale: 10,
          strokeColor: "black",
          strokeWeight: 2,
        },
      }
    : {};

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
        {locations.map((location, i) => (
          <Marker
            key={i + 1}
            position={location}
            label={i + ""}
            {...markerProps}
          />
        ))}
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
