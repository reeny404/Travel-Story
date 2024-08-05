"use client";
import PlanAPI from "@/apis/plan.api";
import Icon from "@/components/commons/Icon";
import Profile from "@/components/Frame/Profile";
import { ICON } from "@/constants/icon";
import { BottomSheetType } from "@/types/plan";
import { Tables } from "@/types/supabase";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import BottomSheet from "../_components/BottomSheet";
import CreateScheduleButton from "../_components/CreateScheduleButton";
import DayMenu from "../_components/DayMenu";
import BarIcon from "../_components/icons/BarIcon";
import MapIcon from "../_components/icons/MapIcon";
import ScheculeList from "./ScheduleList";

const api = new PlanAPI(axios);
type PlanDetailPageProps = { params: { planId: string } };

function PlanDetailPage({ params: { planId } }: PlanDetailPageProps) {
  const router = useRouter();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetConfig, setBottomSheetConfig] = useState<BottomSheetType>({
    type: "customePlace",
    status: "add",
  });
  const [selectedDay, setSelectedDay] = useState(1);
  const [days, setDays] = useState<number[]>([]);
  const [title, setTitle] = useState<string | null>();
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

          const timeDiff = endDate.getTime() - startDate.getTime();
          const daysCount = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // 일 수 계산

          const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);
          setDays(daysArray);
          setTitle(plan.title);

          // 날짜 형식 변환
          const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}.${month}.${day}`;
          };

          const formattedStartDate = formatDate(startDate);
          const formattedEndDate = formatDate(endDate);
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

  const createByBookmark = useCallback(() => {
    router.push(`/my/bookmarks?planId=${planId}&day=${selectedDay}`);
  }, [selectedDay, planId]);

  if (!planId) {
    return <div>Loading...</div>;
  }

  // const { openDrawer } = useDrawerStore();

  return (
    <div className="min-h-screen w-full bg-[#FCFCFC]">
      <div className="h-72 w-full bg-gray-200">
        <div className="relative w-full h-full px-4 py-3">
          <Image
            src="/plan/planBanner.png"
            alt="planBanner"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute items-center px-4 flex justify-between left-0 top-0 h-11 w-full text-white">
            <Icon
              icon={ICON.menu.burgerWhite}
              alt="drawer"
              size={20}
              // onClick={openDrawer}
            />
            <h2 className="text-[18px] font-semibold ml-2">{title}</h2>
            <div className="flex items-center ml-auto">
              <MapIcon
                className="w-6 h-6"
                onClick={() => router.push(`/plan/${planId}/route`)}
              />
              <BarIcon className="w-6 h-6 ml-6" />
            </div>
          </div>
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
      </div>
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

      <CreateScheduleButton
        createSchedule={() => handleCreateSchedule("customePlace", "add")}
        createByBookmark={createByBookmark}
        createMemo={() => handleCreateSchedule("memo", "add")}
        createMoveSchedule={() => handleCreateSchedule("move", "add")}
      />
    </div>
  );
}

export default PlanDetailPage;
