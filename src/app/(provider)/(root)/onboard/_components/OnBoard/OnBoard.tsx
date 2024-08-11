"use client";
import SvgIcon from "@/components/commons/SvgIcon";
import MainLayout from "@/components/Layout/MainLayout";
import { useOnboardStore } from "@/stores/onboard.store";
import { useLoginStepStore } from "@/stores/step.store";
import { useTravelType } from "@/stores/travelType.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Continent from "../Continent";
import ProgressBar from "../ProgressBar";
import TravelMate from "../TravelMate";
import TravelType from "../TravelType";

function OnBoard() {
  const { travelType } = useTravelType();
  const router = useRouter();
  const [isValidated, setIsValidated] = useState<boolean>(true);
  const params = useSearchParams();
  const nextURL = params.get("next");
  const { progress, setProgress } = useOnboardStore();
  const { setNextURL } = useLoginStepStore();

  useEffect(() => {
    setNextURL(nextURL || "/");
  }, []);

  // const handleTravelTypeClick = (
  //   e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   localStorage.setItem("userTravelType", JSON.stringify(travelType));
  //   router.replace(nextURL);
  //   document.cookie = "hasTravelType=true; path=/";
  // };

  const handleCancelClick = () => {
    document.cookie = "hasTravelType=true; path=/";
    router.back();
  };

  const handleBackClick = () => {
    setProgress(false);
    router.back();
  };

  const sections = [
    <Continent key={1} />,
    <TravelMate key={2} />,
    <TravelType key={3} />,
  ];

  return (
    <MainLayout>
      <header className="flex w-full h-[52px] items-center px-4">
        {progress !== 1 ? (
          <div onClick={handleBackClick}>
            <SvgIcon
              name="arrow-right"
              width={24}
              height={24}
              title="arrow"
              hasStroke={true}
              className="transform rotate-180"
            />
          </div>
        ) : null}
        <div className="w-fit h-fit ml-auto" onClick={handleCancelClick}>
          <SvgIcon name="cancel" width={20} height={20} />
        </div>
      </header>
      <ProgressBar />
      {sections[progress - 1]}
    </MainLayout>
  );
}

export default OnBoard;
