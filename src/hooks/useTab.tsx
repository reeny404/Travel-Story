import { useState } from "react";

export const useTab = ({
  tabs,
  initialTab = null,
}: {
  tabs: { kr: string; en: string }[];
  initialTab?: string | null;
}) => {
  const [currentTab, setCurrentTab] = useState<string | null>(
    initialTab || (tabs.length > 0 ? tabs[0].en : null)
  );

  return {
    currentTab,
    setCurrentTab,
  };
};
