import { useState } from "react";

export const useTab = ({ tabs }: { tabs: { kr: string; en: string }[] }) => {
  const [currentTab, setCurrentTab] = useState<string | null>(null);

  return {
    currentTab,
    setCurrentTab,
  };
};
