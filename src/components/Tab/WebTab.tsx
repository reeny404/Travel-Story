"use client";

import clsx from "clsx";
import Image from "next/image";

type WebTapProps = {
  currentTab: string;
  setCurrentTab: (currentTab: string) => void;
  TABS: { kr: string; en: string; isEnabled?: boolean }[];
  frameClassName?: string;
};

function WebTap({
  currentTab,
  setCurrentTab,
  TABS,
  frameClassName,
}: WebTapProps) {
  return (
    <div
      className={`w-full h-11 flex justify-start items-center gap-x-10 ${frameClassName}`}
    >
      {TABS.map((tab) => (
        <button
          key={tab.en}
          disabled={!tab.isEnabled}
          className={clsx(
            "h-full w-[104px] px-6 flex justify-center items-center border border-none font-light rounded-lg",
            {
              "font-medium": currentTab === tab.en,
            }
          )}
          onClick={() => tab.isEnabled && setCurrentTab(tab.en)}
        >
          <div className="relative flex gap-x-3 items-center">
            {TABS[0].en === "place" && currentTab === tab.en && (
              <div className="relative">
                <Image
                  src="/icons/place-none.svg"
                  alt="place"
                  width={16}
                  height={16}
                  className={currentTab === "place" ? "block" : "hidden"}
                  priority
                />
                <Image
                  src="/icons/accommodation-none.svg"
                  alt="accommodation"
                  width={16}
                  height={16}
                  className={
                    currentTab === "accommodation" ? "block" : "hidden"
                  }
                  priority
                />
                <Image
                  src="/icons/shop-none.svg"
                  alt="shop"
                  width={16}
                  height={16}
                  className={currentTab === "shop" ? "block" : "hidden"}
                  priority
                />
                <Image
                  src="/icons/restaurant-none.svg"
                  alt="restaurant"
                  width={16}
                  height={16}
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

export default WebTap;
