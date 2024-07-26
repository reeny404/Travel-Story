"use client";

import useRecommendStore from "@/stores/recommend.store";

const TABS: { kr: string; en: string }[] = [
  { kr: "관광", en: "place" },
  { kr: "숙소", en: "accommodation" },
  { kr: "식당", en: "restaurant" },
  { kr: "쇼핑", en: "shop" },
];

function Tab() {
  const { currentTab, setCurrentTab } = useRecommendStore();

  console.log("selectedTab", currentTab);
  return (
    <div>
      <div className="w-full h-10  flex justify-around items-center">
        {TABS.map((tab) => {
          return (
            <button
              key={tab.en}
              className={`${
                tab.en === currentTab ? "bg-blue-300" : ""
              } h-full w-1/4`}
              onClick={() => setCurrentTab(tab.en)}
            >
              {tab.kr}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Tab;
