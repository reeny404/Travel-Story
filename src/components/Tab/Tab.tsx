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
      className={clsx(
        "w-full h-9 flex justify-around items-center gap-x-2 z-50 my-3 sticky top-0",
        { "rounded-lg": TABS[0].en === "notice" }
      )}
    >
      {TABS.map((tab) => (
        <button
          key={tab.en}
          className={clsx(
            "h-full w-full flex justify-center items-center border border-none rounded-lg font-bold",
            {
              "bg-black text-white": tab.en === currentTab,
              "bg-white text-black": tab.en !== currentTab,
            }
          )}
          onClick={() => setCurrentTab(tab.en)}
        >
          {tab.kr}
        </button>
      ))}
    </div>
  );
}

export default Tab;
