"use client";
import { api } from "@/apis/api";
import Icon from "@/components/commons/Icon";
import { ICON } from "@/constants/icon";
import { Plan } from "@/types/plan";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MyTrip from "../../_components/MyTrip";

function MySchedule() {
  const router = useRouter();
  const [recentPlan, setRecentPlan] = useState<Plan>();

  const { data: planList, isPending } = useQuery({
    queryKey: ["plan", "my"],
    queryFn: () => api.plan.getMyPlans(),
  });

  if (!planList || !planList.length) {
    return (
      <div className="mb-4 z-10">
        <MyTrip />
      </div>
    );
  }

  // 최신 일정 클릭
  const handlePlanClick = () => {
    router.push(`plan/${planList[0].id}`);
  };

  // 최신 일정의 지도 클릭
  const handleMapClick = () => {
    router.push(`plan/${planList[0].id}/route`);
  };

  // 최신 일정의 가계부 클릭
  const handleAccountClick = () => {
    router.push(`plan/${planList[0].id}/account`);
  };

  return (
    <section className="flex mt-12 mb-4 z-10">
      <div
        onClick={handlePlanClick}
        className="flex-grow h-11 px-5 py-[10px] bg-brand-300 rounded-lg cursor-pointer"
      >
        <p className="w-fit text-lg leading-6 font-semibold">
          {planList[0].title}
        </p>
      </div>
      <div
        className="w-11 h-11 bg-white rounded-lg ml-2"
        onClick={handleMapClick}
      >
        <Icon icon={ICON.map.off} />
      </div>
      <div
        className="w-11 h-11 bg-white rounded-lg ml-2"
        onClick={handleAccountClick}
      >
        <Icon icon={ICON.calculator.off} />
      </div>
    </section>
  );
}

export default MySchedule;
