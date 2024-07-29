import { useState } from "react";

const TABS: { kr: string; en: string }[] = [
  { kr: "관광", en: "place" },
  { kr: "숙소", en: "accommodation" },
  { kr: "식당", en: "restaurant" },
  { kr: "쇼핑", en: "shop" },
];

export const useTab = () => {
  const [currentTab, setCurrentTab] = useState<string>(TABS[0].en);

  return {
    currentTab,
    setCurrentTab,
    TABS,
  };
};
