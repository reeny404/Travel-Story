"use client";
import SvgIcon from "@/components/commons/SvgIcon";
import MainLayout from "@/components/Layout/MainLayout";
import { useOnboardStore } from "@/stores/onboard.store";
import { useTravelType } from "@/stores/travelType.store";
import { useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import Continent from "../Continent";
import ProgressBar from "../ProgressBar";
import TravelMate from "../TravelMate";
import TravelType from "../TravelType";

function OnBoard() {
  const { travelType } = useTravelType();
  const router = useRouter();
  const [isValidated, setIsValidated] = useState<boolean>(true);
  const params = useSearchParams();
  const nextURL = params.get("next") ?? "/";
  const { progress } = useOnboardStore();

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

  const sections = [
    <Continent key={1} />,
    <TravelMate key={2} />,
    <TravelType key={3} />,
  ];

  return (
    <MainLayout>
      <header className="flex w-full h-[52px] items-center px-4">
        <SvgIcon name="cancle" width={20} height={20} className="ml-auto" />
      </header>
      <ProgressBar />
      {sections[progress - 1]}
    </MainLayout>
  );
}

export default OnBoard;
