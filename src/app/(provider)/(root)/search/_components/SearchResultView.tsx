"use client";

import { api } from "@/apis/api";
import AreaTagCard from "@/components/Card/AreaTagCard";
import ArchCardSlider from "@/components/Slider/ArchCardSlider";
import Tab from "@/components/Tab/Tab";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import { Area, RecommendResponse } from "@/types/Recommend";
import { SearchResultsType, SearchResultViewProps } from "@/types/search";
import { getKrCategory } from "@/utils/getKrCategory";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import RecentArea from "./RecentArea";
import SearchPageTitle from "./SearchPageTitle";

const INITIAL_ITEMS = 3;

function SearchResultView({
  results,
  isPending,
  error,
  onSearch,
  onLoadMore,
  onFold,
  totalResults,
  searchTerm,
}: SearchResultViewProps) {
  const [filteredTabs, setFilteredTabs] = useState([...TABS.default]);
  const [nearbyPlaceCount, setNearbyPlaceCount] = useState<number>(3);
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.areaDetail });

  const validTab = (currentTab || "place") as keyof SearchResultsType;
  const filteredResults = results[validTab] || [];
  const firstResult = filteredResults.length > 0 ? filteredResults[0] : null;

  const { data: nearbyPlace } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["nearbyPlace", firstResult?.cityId],
    queryFn: () => api.area.getAllAreasByCity(firstResult?.cityId!),
    select: (data) => data?.data,
    staleTime: 1000 * 60 * 3,
    enabled: !!firstResult,
  });

  const handleLoadMore = () => {
    setNearbyPlaceCount((prevCount) => {
      const newCount = prevCount + 5;
      return newCount < (nearbyPlace?.length || 0)
        ? newCount
        : nearbyPlace?.length || 0;
    });
  };

  const handleFoldButton = () => {
    setNearbyPlaceCount(3);
  };

  const isLoadEnd = () => {
    return nearbyPlaceCount >= (nearbyPlace?.length || 0);
  };

  useEffect(() => {
    if (results && Object.values(results).some((arr) => arr.length > 0)) {
      const updatedTabs = TABS.default.map((tab) => ({
        ...tab,
        isEnabled: results[tab.en as keyof SearchResultsType]?.length > 0,
      }));

      setFilteredTabs(updatedTabs);

      // 첫 검색결과 표기 화면때만 기본 탭 설정
      if (
        !currentTab ||
        !results[currentTab as keyof SearchResultsType]?.length
      ) {
        const firstEnabledTab = updatedTabs.find((tab) => tab.isEnabled);
        if (firstEnabledTab) {
          setCurrentTab(firstEnabledTab.en as keyof SearchResultsType);
        }
      }
    }
  }, [results, currentTab, setCurrentTab]);

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

  if (!filteredResults || filteredResults.length === 0) {
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

  // 검색결과 버튼
  const loadMoreOrFoldButton = (category: keyof SearchResultsType) => {
    const totalResultsInCategory = totalResults?.[category] || 0;
    const currentResultsInCategory = results?.[category]?.length || 0;

    // 검색 결과가 없으면 버튼 숨기기
    if (currentResultsInCategory === 0) {
      return null;
    }

    // 검색 이후 추가 데이터가 없을 경우 숨기기
    if (
      currentResultsInCategory <= INITIAL_ITEMS &&
      currentResultsInCategory === totalResultsInCategory
    ) {
      return null;
    }

    const handleSearchButtonClick =
      currentResultsInCategory < totalResultsInCategory
        ? () => onLoadMore(category)
        : () => onFold(category);

    const buttonText =
      currentResultsInCategory < totalResultsInCategory
        ? "비슷한 장소 더 보기"
        : "접기";

    return (
      <div className="flex justify-center">
        <button
          className="w-full h-10 mt-3 px-4 py-2 border-[0.6px] border-neutral-600 text-center bg-white rounded-lg cursor-pointer hover:opacity-80 active:bg-neutral-150 sm:w-[190px] sm:h-12 sm:px-7 sm:py-3 sm:border-neutral-350 sm:mt-10"
          onClick={handleSearchButtonClick}
        >
          {buttonText}
        </button>
      </div>
    );
  };

  return (
    <main className="w-full">
      <section className="px-4 md:px-8">
        <Tab
          TABS={filteredTabs}
          currentTab={currentTab!}
          setCurrentTab={(tab: string) =>
            setCurrentTab(tab as keyof SearchResultsType)
          }
          frameClassName="top-[56px] shadow-area-section"
        />

        <SearchPageTitle
          title={`"${searchTerm}" 검색 결과예요`}
          isHidden
          isTop
        />
        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 sm:gap-8">
          {filteredResults.map((result, index) => (
            <Link
              href={`/recommend/area/${result.id}`}
              key={`${result.id}-${index}`}
            >
              <AreaTagCard
                key={result.id}
                image={result.imageUrl || "/sampleImg.jpg"}
                alt={result.name}
                title={result.krName ?? ""}
                tag={getKrCategory(result.type ?? "")}
                rating={result.rating ?? ""}
                desc={result.description}
              />
            </Link>
          ))}
        </div>
        {loadMoreOrFoldButton(validTab)}
      </section>

      <RecentArea className="px-4 md:px-8" />

      <section className="px-4 md:px-8">
        <SearchPageTitle title="근처 가볼만 한 곳" />
        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 sm:gap-8">
          {nearbyPlace && nearbyPlace.length > 0 && (
            <>
              {nearbyPlace.slice(0, nearbyPlaceCount).map((place, index) => (
                <Link
                  href={`/recommend/area/${place.id}`}
                  key={`${place.id}-${index}`}
                >
                  <AreaTagCard
                    image={place.imageUrl || "/sampleImg.jpg"}
                    alt={place.name}
                    title={place.krName ?? ""}
                    tag={getKrCategory(place.type ?? "")}
                    rating={place.rating ?? ""}
                    desc={place.description}
                  />
                </Link>
              ))}
            </>
          )}
        </div>

        <div className="flex justify-center">
          <button
            className="w-full h-10 mt-3 px-4 py-2 border-[0.6px] border-neutral-600 text-center bg-white rounded-lg cursor-pointer hover:opacity-80 active:bg-neutral-150 sm:w-[190px] sm:h-12 sm:px-7 sm:py-3 sm:border-neutral-350 sm:mt-10"
            onClick={isLoadEnd() ? handleFoldButton : handleLoadMore}
          >
            {isLoadEnd() ? "접기" : "더 둘러보기"}
          </button>
        </div>
      </section>

      {/*check point */}
      {/* <RecentArea />

      <SearchPageTitle title="근처 가볼만 한 곳" />
      <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 sm:gap-8">
        {nearbyPlace && nearbyPlace.length > 0 && (
          <>
            {nearbyPlace.slice(0, nearbyPlaceCount).map((place, index) => (
              <Link
                href={`/recommend/area/${place.id}`}
                key={`${place.id}-${index}`}
              >
                <AreaTagCard
                  image={place.imageUrl || "/sampleImg.jpg"}
                  alt={place.name}
                  title={place.krName ?? ""}
                  tag={getKrCategory(place.type ?? "")}
                  rating={place.rating ?? ""}
                  desc={place.description}
                />
              </Link>
            ))}
          </>
        )}
      </div>

      <div className="flex justify-center">
        <button
          className="w-full h-10 mt-3 px-4 py-2 border-[0.6px] border-neutral-600 text-center bg-white rounded-lg cursor-pointer hover:opacity-80 active:bg-neutral-150 sm:w-[190px] sm:h-12 sm:px-7 sm:py-3 sm:border-neutral-350 sm:mt-10"
          onClick={isLoadEnd() ? handleFoldButton : handleLoadMore}
        >
          {isLoadEnd() ? "접기" : "더 둘러보기"}
        </button>
      </div>

      <div className="w-full my-2">
        <SearchPageTitle title="인기 여행지" className="pl-4" />
        <ArchCardSlider spacing={12} slidesPerView={3.8} />
      </div> */}

      <section className="w-full mt-2 sm:mb-6 md:mb-12 lg:mb-16">
        <SearchPageTitle title="인기 여행지" className="pl-4 md:pl-8" />
        <ArchCardSlider />
      </section>
    </main>
  );
}

export default SearchResultView;
