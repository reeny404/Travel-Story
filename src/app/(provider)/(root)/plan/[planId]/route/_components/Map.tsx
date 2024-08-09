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
import { getColorChip } from "../../../_components/Color";

const KEY: string = process.env.NEXT_PUBLIC_MAP_API_KEY!;
type props = { locations: LatLng[] };

function Map({ locations }: props) {
  const [isInit, setIsInit] = useState<boolean>(false);
  const center: LatLng = useMemo(() => {
    const latLng = LatLngUtil.calculateCenter(locations);
    // 하단에 슬라이드 영역이 있어서 조정
    latLng.lat -= 0.05;
    // latLng.lng += 0.05;
    return latLng;
  }, [locations]);

  const handleOnLoad = useCallback(() => setIsInit(true), []);
  const getMarkerProps = useCallback(
    (i: number) => {
      if (!isInit) {
        return {};
      }

      const color: string = getColorChip(i);
      return {
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: color,
          fillOpacity: 1,
          strokeColor: color,
          strokeWeight: 1,
          strokeOpacity: 1,
        },
      };
    },
    [isInit]
  );

  return (
    <LoadScript googleMapsApiKey={KEY} onLoad={handleOnLoad}>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100vh",
        }}
        center={center}
        zoom={10}
      >
        {locations.map((location, i) => {
          const props = getMarkerProps(i);
          const label = i + 1 + "";
          return (
            <Marker key={i} position={location} label={label} {...props} />
          );
        })}
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
