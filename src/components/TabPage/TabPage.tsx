"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";

export type Tabs = Record<string, React.JSX.Element>;

type TabProps = { tabs: Tabs };

function TabPage({ tabs }: TabProps) {
  const titles: string[] = Object.keys(tabs);
  const [selectedTab, setSelectedTab] = useState<string>(titles[0]);

  const handleOnClickTab = useCallback((name: string) => {
    setSelectedTab(name);
  }, []);

  return (
    <>
      <section className="w-full py-2 flex justify-center items-center space">
        {titles.map((title, i) => (
          <button
            key={i}
            className={clsx("h-full px-8 py-1 text-sm", {
              "bg-gray-200": selectedTab === title,
            })}
            onClick={() => handleOnClickTab(title)}
          >
            {title}
          </button>
        ))}
      </section>
      <section className="py-4">{tabs[selectedTab]}</section>
    </>
  );
}

export default TabPage;
