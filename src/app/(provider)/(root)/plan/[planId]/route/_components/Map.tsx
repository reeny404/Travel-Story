"use client";

import { LatLng } from "@/types/LatLng";
import { LatLngUtil } from "@/utils/LatLngUtil";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { getColorChip } from "../../../_components/Color";
import Loading from "../../../_components/Loading";

const KEY: string = process.env.NEXT_PUBLIC_MAP_API_KEY!;
type props = { locations: LatLng[] };

function Map({ locations }: props) {
  const [center, setCenter] = useState<LatLng>();

  useEffect(() => {
    const latLng: LatLng | null = LatLngUtil.calculateCenter(locations);
    if (!latLng) {
      return;
    }
    // 하단에 슬라이드 영역이 있어서 조정
    latLng.lat -= 0.05;
    // latLng.lng += 0.05;
    setCenter(latLng);
  }, [locations]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: KEY,
  });

  if (!isLoaded) {
    return <Loading />;
  }

  const getMarkerProps = (i: number) => {
    try {
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
    } catch (e) {
      console.warn(e);
    }
  };

  return (
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
        return <Marker key={i} position={location} label={label} {...props} />;
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
  );
}

export default React.memo(Map);
