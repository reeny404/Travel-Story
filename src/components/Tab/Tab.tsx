"use client";

import clsx from "clsx";

type TabProps = {
  currentTab: string;
  setCurrentTab: (currentTab: string) => void;
  TABS: { kr: string; en: string }[];
};

function Tab({ currentTab, setCurrentTab, TABS }: TabProps) {
  // sticky기능을 쓸 때는 부모 요소에서 overflow를 제거해주세요
  return (
    <div
      className={
        "w-full h-10 bg-white flex justify-around items-center sticky top-0 z-50"
      }
    >
      {TABS.map((tab) => (
        <button
          key={tab.en}
          className={clsx("h-full w-1/4", {
            "bg-blue-300": tab.en === currentTab,
          })}
          onClick={() => setCurrentTab(tab.en)}
        >
          {tab.kr}
        </button>
      ))}
    </div>
  );
}

export default Tab;
