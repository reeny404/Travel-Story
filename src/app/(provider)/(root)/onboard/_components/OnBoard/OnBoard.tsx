"use client";
import MainLayout from "@/components/Layout/MainLayout";
import { useTravelType } from "@/stores/travelType.store";
import { useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import Continent from "../Continent";

function OnBoard() {
  const { travelType } = useTravelType();
  const router = useRouter();
  const [isValidated, setIsValidated] = useState<boolean>(true);
  const params = useSearchParams();
  const nextURL = params.get("next") ?? "/";

  console.log(nextURL);
  useEffect(() => {
    if (
      travelType.season.length !== 0 &&
      travelType.theme.length !== 0 &&
      travelType.travelMate.length !== 0
    ) {
      setIsValidated(false);
    } else {
      setIsValidated(true);
    }
  }, [travelType]);

  const handleTravelTypeClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    console.log(nextURL);
    localStorage.setItem("userTravelType", JSON.stringify(travelType));
    router.replace(nextURL);
    document.cookie = "hasTravelType=true; path=/";
  };

  return (
    <MainLayout headerProps={{ backgroundColor: "noShadow", title: "" }}>
      <Continent />
    </MainLayout>
  );
}

export default OnBoard;
