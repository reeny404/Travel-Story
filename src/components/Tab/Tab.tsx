"use client";

import { useTab } from "@/hooks/useTab"; // 훅 경로를 적절히 수정하세요

function Tab() {
  const { currentTab, setCurrentTab, TABS } = useTab();

  console.log("selectedTab", currentTab);

  return (
    <div>
      <div className="w-full h-10 flex justify-around items-center">
        {TABS.map((tab) => (
          <button
            key={tab.en}
            className={`${
              tab.en === currentTab ? "bg-blue-300" : ""
            } h-full w-1/4`}
            onClick={() => setCurrentTab(tab.en)}
          >
            {tab.kr}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tab;
