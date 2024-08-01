"use client";

import { BottomSheetType } from "@/types/plan";
import { useState } from "react";
import BottomSheet from "../_components/BottomSheet";
import DayMenu from "../_components/DayMenu";
import ScheculeList from "./ScheculeList";

function PlanDetailPage({ params }: { params: { planId: string } }) {
  const planId = params.planId;

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetConfig, setBottomSheetConfig] = useState<BottomSheetType>({
    type: "customePlace",
    status: "add",
  });
  const [selectedDay, setSelectedDay] = useState(1);

  const handleOpen = (
    type: BottomSheetType["type"],
    status: BottomSheetType["status"]
  ) => {
    setBottomSheetConfig({ type, status });
    setBottomSheetVisible(true);
  };

  const handleClose = () => {
    setBottomSheetVisible(false);
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  if (!planId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <div className="h-48 w-full bg-gray-200"></div>
      <DayMenu selectedDay={selectedDay} onDaySelect={handleDaySelect} />
      <ScheculeList planId={planId} selectedDay={selectedDay} />
      {isBottomSheetVisible && (
        <BottomSheet
          type={bottomSheetConfig.type}
          status={bottomSheetConfig.status}
          onClose={handleClose}
          planId={planId}
          day={selectedDay}
        />
      )}
      {/* 바텀 시트 예시 */}
      <button
        className="w-12 h-12 fixed bottom-20 right-8 bg-blue-500 rounded-full hover:brightness-110"
        onClick={() => handleOpen("customePlace", "add")}
      >
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-white">생성</p>
        </div>
      </button>
    </div>
  );
}

export default PlanDetailPage;
