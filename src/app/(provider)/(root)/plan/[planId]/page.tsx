"use client";

import PlanAPI from "@/apis/plan.api"; // 디폴트 익스포트로 가져옴
import { BottomSheetType } from "@/types/plan";
import { Tables } from "@/types/supabase";
import axios from "axios";
import { useEffect, useState } from "react";
import BottomSheet from "../_components/BottomSheet";
import DayMenu from "../_components/DayMenu";
import ScheculeList from "./ScheculeList";

// PlanAPI 인스턴스를 컴포넌트 바깥으로 이동
const api = new PlanAPI(axios);

function PlanDetailPage({ params }: { params: { planId: string } }) {
  const planId = params.planId;

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetConfig, setBottomSheetConfig] = useState<BottomSheetType>({
    type: "customePlace",
    status: "add",
  });
  const [selectedDay, setSelectedDay] = useState(1);
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const planData: Tables<"plan">[] = await api.getMyPlans(); // PlanAPI를 통해 데이터 가져오기
        const plan = planData.find((p: Tables<"plan">) => p.id === planId);

        if (plan) {
          // startDate 및 endDate가 문자열임을 가정하고 변환
          const startDate = new Date(plan.startDate as string);
          const endDate = new Date(plan.endDate as string);

          const timeDiff = endDate.getTime() - startDate.getTime();
          const daysCount = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // 일 수 계산

          const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);
          setDays(daysArray);
        }
      } catch (error) {
        console.error("Error fetching plan data:", error);
      }
    };

    fetchPlanData();
  }, [planId]);

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
      <DayMenu
        days={days}
        selectedDay={selectedDay}
        onDaySelect={handleDaySelect}
      />
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
      <button
        className="w-12 h-12 fixed bottom-32 right-8 bg-blue-500 rounded-full hover:brightness-110"
        onClick={() => handleOpen("memo", "add")}
      >
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-white">생성</p>
        </div>
      </button>
      <button
        className="w-12 h-12 fixed bottom-48 right-8 bg-blue-500 rounded-full hover:brightness-110"
        onClick={() => handleOpen("move", "add")}
      >
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-white">생성</p>
        </div>
      </button>
    </div>
  );
}

export default PlanDetailPage;
