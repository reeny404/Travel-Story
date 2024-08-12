"use client";

import AreaTagCard from "@/components/Card/AreaTagCard";
import Tab from "@/components/Tab/Tab";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import { Area } from "@/types/Recommend";
import { getKrCategory } from "@/utils/getKrCategory";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SearchResultViewProps = {
  results: Area[];
  isPending: boolean;
  error: Error | null;
};

function SearchResultView({
  results,
  isPending,
  error,
}: SearchResultViewProps) {
  const router = useRouter();
  const [filteredTabs, setFilteredTabs] = useState([...TABS.default]);
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.areaDetail });

  useEffect(() => {
    if (results && results.length > 0) {
      const updatedTabs = TABS.default.map((tab) => ({
        ...tab,
        isEnabled: results.some(
          (result) => result && result.type && result.type === tab.en
        ),
      }));

      setFilteredTabs(updatedTabs);

      const firstEnabledTab = updatedTabs.find((tab) => tab.isEnabled);
      if (firstEnabledTab) {
        setCurrentTab(firstEnabledTab.en);
      }
    }
  }, [results, setCurrentTab]);

  if (isPending) {
    return <p>로딩중입니다...</p>;
  }

  if (error) {
    return <p>지금은 에러가 발생했어요! 나중에 다시 검색해주세요.</p>;
  }

  if (!results || results[0] === null) {
    return <p>검색 결과가 없어요...</p>;
  }

  const handleMoveDetail = (areaId: number) => {
    router.push(`/recommend/area/${areaId}`);
  };

  const filteredResults = results.filter(
    (result) => result?.type && result.type === currentTab
  );

  return (
    <main className="w-full px-4">
      <Tab
        TABS={filteredTabs}
        currentTab={currentTab!}
        setCurrentTab={setCurrentTab}
        frameClassName="top-[56px] shadow-area-section"
      />
      {filteredResults.map((result) => (
        <AreaTagCard
          key={result.id}
          image={result.imageUrl || "/sampleImg.jpg"}
          alt={result.name}
          title={result.krName ?? ""}
          tag={getKrCategory(result.type ?? "")}
          rating={result.rating ?? ""}
          desc={result.description}
          onClick={() => handleMoveDetail(result.id)}
        />
      ))}
    </main>
  );
}

export default SearchResultView;

{
  /* <CountryButton
            size="md"
            imgPath={result.imageUrl || "/sampleImg.jpg"}
            alt={result.name}
            imgSize="sm"
            countryName={result.krName ?? ""}
            desc={result.name}
            onClick={() => handleMoveDetail(result.id)}
            isCountry
          /> */
}
