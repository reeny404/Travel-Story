"use client";
import Icon from "@/components/commons/Icon";
import { ICON } from "@/constants/icon";
import { useAuth } from "@/contexts/auth.contexts";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MyTrip from "../../_components/MyTrip";

function MySchedule() {
  const router = useRouter();
  const supabase = createClient();
  const [recentPlan, setRecentPlan] = useState<{
    id: string;
    title: string;
  } | null>();
  const { isInitialized, user } = useAuth();

  useEffect(() => {
    const getMyPlan = async () => {
      if (isInitialized && user) {
        const { data, error } = await supabase
          .from("plan")
          .select("id, title")
          .eq("userId", user.id);

        if (error) {
          console.error(error);
        }
        if (data) {
          setRecentPlan(data[data.length - 1]);
        }
      }
    };
    getMyPlan();
  }, []);

  if (!recentPlan) {
    return (
      <div className="mb-4 z-10">
        <MyTrip />
      </div>
    );
  }

  // 최신 일정 클릭
  const handlePlanClick = () => {
    router.push(`plan/${recentPlan.id}`);
  };

  // 최신 일정의 지도 클릭
  const handleMapClick = () => {
    router.push(`plan/${recentPlan.id}/route`);
  };

  // 최신 일정의 가계부 클릭
  const handleAccountClick = () => {
    router.push(`plan/${recentPlan.id}/account`);
  };

  return (
    <section className="flex mt-12 mb-4 z-10">
      <div
        onClick={handlePlanClick}
        className="flex-grow h-11 px-5 py-[10px] bg-brand-300 rounded-lg cursor-pointer"
      >
        <p className="w-fit text-lg leading-6 font-semibold">
          {recentPlan.title}
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
