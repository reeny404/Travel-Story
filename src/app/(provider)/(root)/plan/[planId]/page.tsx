"use client";
import { api } from "@/apis/api";
import Icon from "@/components/commons/Icon";
import SvgIcon from "@/components/commons/SvgIcon";
import Profile from "@/components/Frame/Profile";
import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import useDrawerStore from "@/stores/drawer.store";
import { BottomSheetType, PlanFull } from "@/types/plan";
import { DateUtil } from "@/utils/DateUtil";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import BottomSheet from "../_components/BottomSheet";
import CreateScheduleButton from "../_components/CreateScheduleButton";
import DayMenu from "../_components/DayMenu";
import Loading from "../_components/Loading";
import ScheduleList from "../_components/ScheduleList";

type PlanDetailPageProps = { params: { planId: string } };

function PlanDetailPage({ params: { planId } }: PlanDetailPageProps) {
  const { openDrawer } = useDrawerStore();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetConfig, setBottomSheetConfig] = useState<BottomSheetType>({
    type: "customPlace",
    status: "add",
  });
  const [selectedDay, setSelectedDay] = useState(1);
  const [plan, setPlan] = useState<PlanFull | null>(null);
  const [days, setDays] = useState<number[]>([]);
  const [formattedDates, setFormattedDates] = useState<string>("");

  useEffect(() => {
    api.plan
      .find(planId, 1)
      .then((plan) => {
        if (!plan) {
          return;
        }

        setPlan(plan);
        // startDate 및 endDate가 문자열임을 가정하고 변환
        const startDate = new Date(plan.startDate as string);
        const endDate = new Date(plan.endDate as string);
        const daysCount = DateUtil.getGapDay(startDate, endDate);

        const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);
        setDays(daysArray);

        const formattedStartDate = DateUtil.format("yyyy.MM.dd", startDate);
        const formattedEndDate = DateUtil.format("yyyy.MM.dd", endDate);
        setFormattedDates(`${formattedStartDate} - ${formattedEndDate}`);
      })
      .catch((error) => {
        console.error("Error fetching plan data:", error);
      });
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

  if (!plan) {
    return <Loading />;
  }

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "transparent",
        title: plan?.title ?? "",
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
      <div className="hidden md:flex min-h-12 justify-between items-center">
        <div className="flex items-center text-lg font-semibold">
          <Icon
            icon={ICON.menu.burgerBlack}
            alt="drawer"
            size={20}
            onClick={openDrawer}
          />
          {plan?.title}
        </div>
        <div className="flex space-x-8 text-sm font-normal pr-4">
          <Link
            href={`/plan/${planId}/route`}
            className="flex items-center space-x-2.5 px-1"
          >
            <SvgIcon name="map" width={16} height={16} />
            <span>지도 보기</span>
          </Link>
        </div>
      </div>
      <div className="hidden md:block w-screen h-[300px] absolute top-40 left-0 right-0">
        <Image
          src="/plan/banner.jpg"
          alt="desktop-banner"
          fill
          className="object-cover"
        />
      </div>
      <div className="min-h-screen bg-gray-50 relative -top-[52px] md:top-[300px]">
        <section className="w-full sm:h-72 md:h-0 px-4 py-3 relative md:bottom-6">
          <Image
            src="/plan/banner.jpg"
            alt="mobile-banner"
            fill
            className="object-cover block md:hidden"
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
        </section>
        <section className="md:relative md:-top-6 flex justify-between">
          <DayMenu
            days={days}
            selectedDay={selectedDay}
            onDaySelect={handleDaySelect}
          />
        </section>
        <article className="flex">
          <div className="md:hidden">
            <ScheduleList planId={planId} selectedDay={selectedDay} />
          </div>
          <div className="hidden md:block">
            {days.map((day) => (
              <div
                key={day}
                className={day === selectedDay ? "bg-gray-50" : "bg-gray-100"}
              >
                <ScheduleList planId={planId} selectedDay={day} />
              </div>
            ))}
          </div>
        </article>
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
          createSchedule={() => handleCreateSchedule("customPlace", "add")}
          pathTocreateByBookmark={`/my/bookmarks?planId=${planId}&day=${selectedDay}`}
          createMemo={() => handleCreateSchedule("memo", "add")}
          createMoveSchedule={() => handleCreateSchedule("move", "add")}
        />
      </div>
    </MainLayout>
  );
}

export default PlanDetailPage;
