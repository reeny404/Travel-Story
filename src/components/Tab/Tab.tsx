"use client";

type TabProps = {
  currentTab: string;
  setCurrentTab: (currentTab: string) => void;
  TABS: { kr: string; en: string }[];
};

function Tab({ currentTab, setCurrentTab, TABS }: TabProps) {
  return (
    <div>
      <div className="w-full h-10 flex justify-around items-center">
        {TABS.map((tab) => (
          <button
            key={tab.en}
            className={`${
              tab.en === currentTab ? "bg-blue-300" : ""
            } h-full w-1/4`}
            onClick={() => setCurrentTab(tab.en)}
          >
            {tab.kr}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tab;
