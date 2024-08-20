"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import { useAuth } from "@/contexts/auth.contexts";
import useCountryFilterStore from "@/stores/searchFilter.store";
import { PlanInsertType } from "@/types/plan";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import NewPlanBase from "./_components/NewPlanBase";
import NewPlanStyle from "./_components/NewPlanStyle";

function CreatePlanIntroPage() {
  const titles: string[] = useMemo(() => ["기본 정보", "여행 성격"], []);
  const [selectedTab, setSelectedTab] = useState<string>(titles[0]);
  const [plan, setPlanData] = useState<PlanInsertType>({});
  const { countryFilter } = useCountryFilterStore();
  const router = useRouter();

  const { isInitialized, isLoggedIn } = useAuth();
  if (isInitialized && !isLoggedIn) {
    router.replace("/login?nextUrl=" + encodeURI("/plan/create"));
    return;
  }

  const onClickToCreatePlan = () => {
    api.plan
      .create({
        ...plan,
        country: countryFilter.name,
      })
      .then(() => {
        router.push("/plan");
      });
  };

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "내 여행 정보",
        leftIcons: [],
        rightIcons: [
          {
            icon: ICON.cancel.black,
            alt: "close",
            size: 20,
            path: "/plan",
          },
        ],
      }}
    >
      <section className="w-full py-4 flex justify-center items-center">
        {titles.map((title) => (
          <button
            key={title}
            className={clsx(
              "w-full h-full py-2.5 text-base",
              selectedTab === title
                ? "border-b-2 border-b-brand-800 text-brand-800 font-semibold"
                : "font-normal"
            )}
            onClick={() => setSelectedTab(title)}
          >
            {title}
          </button>
        ))}
      </section>
      <section className="py-4">
        {selectedTab === titles[0] ? (
          <NewPlanBase data={plan} set={setPlanData} />
        ) : (
          <NewPlanStyle data={plan} set={setPlanData} />
        )}
      </section>
      <div className="w-full py-10 flex justify-center">
        <button
          className="w-11/12 py-2 rounded border bg-gray-750 text-white hover:border-gray-750 hover:text-gray-750 hover:bg-white"
          onClick={onClickToCreatePlan}
        >
          내 여행 생성
        </button>
      </div>
    </MainLayout>
  );
}

export default CreatePlanIntroPage;
