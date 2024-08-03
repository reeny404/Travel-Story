"use client";

import MainLayout from "@/components/Layout/MainLayout";
import { useMemo } from "react";
import TabPage, { Tabs } from "../../../../../components/TabPage";
import MyPlanDefault from "./_components/MyPlanDefault";
import MyPlanStyle from "./_components/MyPlanStyle";

function CreatePlanIntroPage() {
  const tabs: Tabs = useMemo(
    () => ({
      "기본 정보": <MyPlanDefault />,
      "여행 성격": <MyPlanStyle />,
    }),
    []
  );

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "내 여행 정보",
      }}
    >
      <TabPage tabs={tabs} />
    </MainLayout>
  );
}

export default CreatePlanIntroPage;
