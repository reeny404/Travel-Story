"use client";

import { BottomSheetType } from "@/types/plan";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import BottomSheet from "../_components/BottomSheet";
import CreateScheduleButton from "../_components/CreateScheduleButton";
import DayMenu from "../_components/DayMenu";
import ScheculeList from "./ScheculeList";

type PlanDetailPageProps = { params: { planId: string } };

function PlanDetailPage({ params: { planId } }: PlanDetailPageProps) {
  const router = useRouter();
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

  const handleCreateSchedule = useCallback(() => {
    handleOpen("customePlace", "add");
  }, []);

  const createByBookmark = useCallback(() => {
    router.push(`/my/bookmarks?planId=${planId}&day=${selectedDay}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay, planId]);

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
      {/* TODO 각 버튼의 연결 제대로 */}
      <CreateScheduleButton
        createSchedule={handleCreateSchedule}
        createByBookmark={createByBookmark}
        createMemo={() => {}}
        createMoveSchedule={() => {}}
      />
    </div>
  );
}

export default PlanDetailPage;
