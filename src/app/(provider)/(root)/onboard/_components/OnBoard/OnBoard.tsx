"use client";
import SubmitButton from "@/components/commons/SubmitButton";
import TravelStyle from "@/components/TravelStyle";
import { useTravelType } from "@/stores/travelType.store";
import { useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

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
    <div className="flex bg-[#f5f5f5] w-full min-h-dvh py-10">
      <div className="flex flex-col w-[375px] px-[13px] mx-auto">
        <h1 className="text-[24px] font-bold mb-4">
          나한테 딱 맞춘 여행
          <br /> 맞춤설정
        </h1>
        <form className="flex flex-col items-center">
          <TravelStyle title="여행 테마가 무엇인가요?" category="theme" />
          <TravelStyle title="언제 떠나시나요?" category="season" />
          <TravelStyle title="누구와 떠나시나요?" category="travelMate" />
          <SubmitButton
            theme="primary"
            size="lg"
            disabled={isValidated}
            onClick={(e) => handleTravelTypeClick(e)}
          >
            설정 저장
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

export default OnBoard;
