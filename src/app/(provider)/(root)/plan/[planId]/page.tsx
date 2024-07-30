"use client";

import { BottomSheetType } from "@/types/plan";
import { useState } from "react";
import { createBottomSheet } from "../_components/BottomSheet"; // 경로를 실제 구조에 맞게 조정하세요.

function PlanDetailPage({ params }: { params: { planId: string } }) {
  const planId = params.planId;

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetConfig, setBottomSheetConfig] = useState<BottomSheetType>({
    type: "customePlace",
    status: "add",
  });

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

  const BottomSheet = createBottomSheet();

  if (!planId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Plan Detail Page</h1>
        <p>Plan ID: {planId}</p>
      </div>
      {isBottomSheetVisible && (
        <BottomSheet
          type={bottomSheetConfig.type}
          status={bottomSheetConfig.status}
          onClose={handleClose}
          planId={planId}
          id="3691e51f-aa76-40b4-a171-80a4ba0c242e"
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
