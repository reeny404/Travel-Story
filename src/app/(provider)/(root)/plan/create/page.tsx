"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import { useAuth } from "@/contexts/auth.contexts";
import { PlanInsertType } from "@/types/plan";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import NewPlanBase from "./_components/NewPlanBase";
import NewPlanStyle from "./_components/NewPlanStyle";

function CreatePlanIntroPage() {
  const router = useRouter();
  const titles: string[] = useMemo(() => ["기본 정보", "여행 성격"], []);
  const [selectedTab, setSelectedTab] = useState<string>(titles[0]);
  const [planData, setPlanData] = useState<PlanInsertType>({});

  const { user } = useAuth();
  if (!user) {
    router.replace("/login?nextUrl=" + encodeURI("/plan/create"));
    return;
  }

  const onClickToCreatePlan = () => {
    api.plan.create(planData).then(() => {
      router.push("/plan");
    });
  };

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "내 여행 정보",
      }}
    >
      <section className="w-full py-4 flex justify-center items-center">
        {titles.map((title) => (
          <button
            key={title}
            className={clsx("h-full px-8 py-1 text-sm", {
              "bg-gray-200": selectedTab === title,
            })}
            onClick={() => setSelectedTab(title)}
          >
            {title}
          </button>
        ))}
      </section>
      <section className="py-4">
        {selectedTab === titles[0] ? (
          <NewPlanBase data={planData} setData={setPlanData} />
        ) : (
          <NewPlanStyle data={planData} setData={setPlanData} />
        )}
      </section>
      <div className="w-full mt-10 flex justify-center">
        <button
          className="w-11/12 py-2 rounded border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
          onClick={onClickToCreatePlan}
        >
          일정 생성하기
        </button>
      </div>
    </MainLayout>
  );
}

export default CreatePlanIntroPage;
