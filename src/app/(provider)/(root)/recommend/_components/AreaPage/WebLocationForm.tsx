"use client";
import { ICON } from "@/constants/icon";
import { Area } from "@/types/Recommend";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Image from "next/image";
import React, { useCallback, useState } from "react";

const KEY: string = process.env.NEXT_PUBLIC_MAP_API_KEY!;

type WebLocationFormProps = {
  area: Area;
};

const WebLocationForm = React.memo(({ area }: WebLocationFormProps) => {
  const [isInit, setIsInit] = useState<boolean>(false);
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
    <section className="hidden h-full bg-[#E8F97B] rounded-lg md:block">
      <article className="flex flex-nowrap items-center h-full px-8 py-8">
        <div className="flex flex-col max-w-[312px]">
          <h1 className="pb-7 text-xl font-medium">위치</h1>
          <div className="pb-8 flex items-start">
            <Image
              src={`/icons/${ICON.location.black.name}.svg`}
              alt="location"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="ml-3">{area.info.address}</p>
          </div>
          <div className="pb-11 md:pb-8 flex items-start">
            <Image
              src={`/icons/${ICON.call.black}.svg`}
              alt="location"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="ml-3">{area.info.phoneNumber}</p>
          </div>
        </div>
        <div className="flex-grow h-[211px] rounded-lg">
          <LoadScript googleMapsApiKey={KEY} onLoad={handleOnLoad}>
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
              zoom={18}
              center={{ lat: area.lat!, lng: area.lng! }}
            >
              <Marker
                position={{ lat: area.lat!, lng: area.lng! }}
                label={""}
                {...markerProps}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </article>
    </section>
  );
});

WebLocationForm.displayName = "WebLocationForm";

export default WebLocationForm;
