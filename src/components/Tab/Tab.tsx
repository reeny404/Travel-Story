"use client";

import clsx from "clsx";
import Image from "next/image";

type TabProps = {
  currentTab: string;
  setCurrentTab: (currentTab: string) => void;
  TABS: { kr: string; en: string; isEnabled?: boolean }[];
  frameClassName?: string;
  isGray?: boolean;
};

function Tab({
  currentTab,
  setCurrentTab,
  TABS,
  frameClassName,
  isGray,
}: TabProps) {
  return (
    <div
      className={`w-full h-11 flex justify-around items-center gap-x-2 z-20 my-3 rounded-lg sticky ${frameClassName}`}
    >
      {TABS.map((tab) => (
        <button
          key={tab.en}
          disabled={!tab.isEnabled}
          className={clsx(
            "h-full w-full flex justify-center items-center border border-none rounded-lg",
            {
              "bg-black text-white font-semibold": tab.en === currentTab,
              "bg-white text-black": tab.en !== currentTab && !isGray,
              "bg-neutral-150 text-black": tab.en !== currentTab && isGray,
              "bg-white opacity-80 cursor-not-allowed": !tab.isEnabled,
            }
          )}
          onClick={() => tab.isEnabled && setCurrentTab(tab.en)}
        >
          <div className="relative flex gap-x-2 items-center">
            {TABS[0].en === "place" && currentTab === tab.en && (
              <div className="relative w-5 h-5">
                <Image
                  src="/icons/place-white.svg"
                  alt="place"
                  width={20}
                  height={20}
                  className={currentTab === "place" ? "block" : "hidden"}
                  priority
                />
                <Image
                  src="/icons/accommodation-white.svg"
                  alt="accommodation"
                  width={20}
                  height={20}
                  className={
                    currentTab === "accommodation" ? "block" : "hidden"
                  }
                  priority
                />
                <Image
                  src="/icons/shop-white.svg"
                  alt="shop"
                  width={20}
                  height={20}
                  className={currentTab === "shop" ? "block" : "hidden"}
                  priority
                />
                <Image
                  src="/icons/restaurant-white.svg"
                  alt="restaurant"
                  width={20}
                  height={20}
                  className={currentTab === "restaurant" ? "block" : "hidden"}
                  priority
                />
              </div>
            )}
            {tab.kr}
          </div>
        </button>
      ))}
    </div>
  );
}

export default Tab;
