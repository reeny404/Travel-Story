"use client";
import PlanAPI from "@/apis/plan.api";
import Profile from "@/components/Frame/Profile";
import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import useDrawerStore from "@/stores/drawer.store";
import { BottomSheetType } from "@/types/plan";
import { Tables } from "@/types/supabase";
import { DateUtil } from "@/utils/DateUtil";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import BottomSheet from "../_components/BottomSheet";
import CreateScheduleButton from "../_components/CreateScheduleButton";
import DayMenu from "../_components/DayMenu";
import ScheduleList from "../_components/ScheduleList";

const api = new PlanAPI(axios);
type PlanDetailPageProps = { params: { planId: string } };

function PlanDetailPage({ params: { planId } }: PlanDetailPageProps) {
  const { openDrawer } = useDrawerStore();
  const router = useRouter();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetConfig, setBottomSheetConfig] = useState<BottomSheetType>({
    type: "customePlace",
    status: "add",
  });
  const [selectedDay, setSelectedDay] = useState(1);
  const [days, setDays] = useState<number[]>([]);
  const [title, setTitle] = useState<string>("");
  const [formattedDates, setFormattedDates] = useState<string>("");

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const planData: Tables<"plan">[] = await api.getMyPlans(); // PlanAPI를 통해 데이터 가져오기
        const plan = planData.find((p: Tables<"plan">) => p.id === planId);

        if (plan) {
          // startDate 및 endDate가 문자열임을 가정하고 변환
          const startDate = new Date(plan.startDate as string);
          const endDate = new Date(plan.endDate as string);
          const daysCount = DateUtil.getGapDay(startDate, endDate);

          const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);
          setDays(daysArray);
          setTitle(plan.title ?? "");

          const formattedStartDate = DateUtil.format("yyyy.MM.dd", startDate);
          const formattedEndDate = DateUtil.format("yyyy.MM.dd", endDate);
          setFormattedDates(`${formattedStartDate} - ${formattedEndDate}`);
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

  const handleCreateSchedule = useCallback(
    (type: BottomSheetType["type"], status: BottomSheetType["status"]) => {
      handleOpen(type, status);
    },
    []
  );

  if (!planId) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "transparent",
        title: title,
        titleAlign: "left",
        rightIcons: [
          {
            icon: ICON.map.white,
            alt: "map",
            size: 24,
            path: `/plan/${planId}/route`,
          },
          {
            icon: ICON.ellipsis.white,
            alt: "더보기",
            size: 24,
            onClick: () => alert("구현 중입니다."),
          },
        ],
      }}
    >
      <div className="min-h-screen bg-gray-50 relative -top-[52px]">
        <div className="relative w-full h-72 px-4 py-3 bg-gray-200">
          <Image
            src="/plan/planBanner.png"
            alt="planBanner"
            fill
            className="object-cover"
          />
          <p className="absolute left-4 bottom-3 rounded-2xl py-[2px] px-4 border border-white text-white">
            {formattedDates}
          </p>
          <div className="absolute right-4 bottom-3">
            <Profile
              src="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/plan/profileSample.jpg"
              className="w-9 h-9"
            />
          </div>
        </div>
        <DayMenu
          days={days}
          selectedDay={selectedDay}
          onDaySelect={handleDaySelect}
        />
        <ScheduleList planId={planId} selectedDay={selectedDay} />
        {isBottomSheetVisible && (
          <BottomSheet
            type={bottomSheetConfig.type}
            status={bottomSheetConfig.status}
            onClose={handleClose}
            planId={planId}
            day={selectedDay}
          />
        )}

        <CreateScheduleButton
          createSchedule={() => handleCreateSchedule("customePlace", "add")}
          pathTocreateByBookmark={`/my/bookmarks?planId=${planId}&day=${selectedDay}`}
          createMemo={() => handleCreateSchedule("memo", "add")}
          createMoveSchedule={() => handleCreateSchedule("move", "add")}
        />
      </div>
    </MainLayout>
  );
}

export default PlanDetailPage;
