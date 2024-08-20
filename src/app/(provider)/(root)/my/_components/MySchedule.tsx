"use client";
import SvgIcon from "@/components/commons/SvgIcon";
import { useAuth } from "@/contexts/auth.contexts";
import { createClient } from "@/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MyTrip from "../../_components/MyTrip";

function MySchedule() {
  const router = useRouter();
  const supabase = createClient();
  const path = usePathname();
  const [recentPlan, setRecentPlan] = useState<{
    id: string;
    title: string;
    startDate: string;
    endDate: string;
  } | null>();
  const { isInitialized, user } = useAuth();

  useEffect(() => {
    const getMyPlan = async () => {
      if (isInitialized && user) {
        const { data, error } = await supabase
          .from("plan")
          .select("id, title, startDate, endDate")
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
  }, [isInitialized]);

  if (!recentPlan) {
    return (
      <div className="mb-4 z-10">
        <MyTrip />
      </div>
    );
  }

  const [year, startMonth, startDay] = recentPlan.startDate.split("-");
  const [_, endMonth, endDay] = recentPlan.endDate.split("-");

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
    <section
      className={`${path === "/my" ? "flex mt-12 mb-4 z-10" : "flex mx-4 mt-10 bg-primary rounded-lg text-white"}`}
    >
      <div
        onClick={handlePlanClick}
        className={`${path === "/my" ? "flex-grow h-11 px-5 py-[10px] bg-brand-300 rounded-lg cursor-pointer" : "flex flex-col flex-grow bg-transparent justify-center px-4"}`}
      >
        <p
          className={`${path === "/my" ? "w-fit text-lg leading-6 font-semibold" : "text-xl font-semibold"}`}
        >
          {recentPlan.title}
        </p>
        {path === "/" ? (
          <p className="text-base font-normal text-neutral-400 pt-2">{`${year} ${startMonth}.${startDay}-${endMonth}.${endDay}`}</p>
        ) : null}
      </div>
      <div className={`${path === "/my" ? "flex" : "flex flex-col"}`}>
        <div
          className={`w-11 h-11 rounded-lg ml-2 grid place-items-center ${path === "/my" ? "bg-white" : "bg-transparent"}`}
          onClick={handleMapClick}
        >
          <button>
            <SvgIcon name="map" color={path === "/" ? "white" : "primary"} />
          </button>
        </div>
        <div
          className={`w-11 h-11 rounded-lg ml-2 grid place-items-center ${path === "/my" ? "bg-white" : "bg-transparent"}`}
          onClick={handleAccountClick}
        >
          <button>
            <SvgIcon
              name="calculator"
              color={path === "/" ? "white" : "primary"}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default MySchedule;
