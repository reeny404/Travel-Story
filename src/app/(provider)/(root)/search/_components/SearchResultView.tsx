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
  onSearch?: (term: string) => void;
};

function SearchResultView({
  results,
  isPending,
  error,
  onSearch,
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
    return (
      <div className="flex flex-col justify-center items-center w-full h-[200px] px-4 mb-10 text-center">
        로딩중입니다...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center px-4 my-20 text-center">
        지금은 에러가 발생했어요! <br /> 나중에 다시 검색해주세요.
      </div>
    );
  }

  if (!results || results[0] === null) {
    return (
      <section className="flex flex-col items-center">
        <div className="flex flex-col justify-center items-center w-full h-[200px] px-4 mb-10">
          <p className="text-center">
            검색결과가 없습니다. <br />
            <span
              className="text-lime-800 leading-6 underline cursor-pointer"
              onClick={() => {
                if (onSearch) {
                  onSearch("오르세 미술관");
                }
              }}
            >
              오르세 미술관
            </span>
            은 어떠세요?
          </p>
        </div>
      </section>
    );
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
        frameClassName="top-[56px] shadow-default"
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
  /* 추후 사용 예정
        <CountryButton
    <section className="w-full px-4">
      {/* <CountryButton
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
