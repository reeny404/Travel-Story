import { useState } from "react";

export const useTab = ({ tabs }: { tabs: { kr: string; en: string }[] }) => {
  const [currentTab, setCurrentTab] = useState<string>(tabs[0].en);

  return {
    currentTab,
    setCurrentTab,
  };
};
