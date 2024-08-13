"use client";

import MainLayout from "@/components/Layout/MainLayout";
import Tab from "@/components/Tab/Tab";
import { ICON } from "@/constants/icon";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import { City, GroupedArea, RecommendResponse } from "@/types/Recommend";
import { LinkUtils } from "@/utils/LinkUtils";
import { Query, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { lazy, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import DetailCard from "../../_components/Cards/DetailCard";
const MainTourForm = lazy(
  () => import("../../_components/MainTour/MainTourForm")
);
const SliderSection = lazy(() => import("../../_components/SliderSection"));

type CityDetailPageProps = {
  cityId: number;
  dehydratedState: any;
};

function CityDetailPage({ cityId, dehydratedState }: CityDetailPageProps) {
  const { ref: viewRef, inView } = useInView();
  const router = useRouter();
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.default });

  useEffect(() => {
    setCurrentTab("place");
  }, []);

  const handleSearch = () => {
    return router.push(`/search`);
  };

  const { data: city, isPending } = useQuery<
    RecommendResponse<City>,
    AxiosError,
    City
  >({
    queryKey: ["city", cityId],
    initialData: dehydratedState.queries.find(
      (q: Query) => q.queryKey[0] === "city"
    )?.state.data,
  });

  const { data: areas } = useQuery<
    RecommendResponse<GroupedArea>,
    AxiosError,
    GroupedArea
  >({
    queryKey: ["areas", cityId],
    initialData: dehydratedState.queries.find(
      (q: Query) => q.queryKey[0] === "areas"
    )?.state.data,
  });

  if (isPending) {
    return <div>loading...</div>;
  }
  return (
    <MainLayout
      headerProps={{
        backgroundColor: inView ? "transparentFixed" : "whiteFixed",
        title: inView ? "" : city?.krName!,
        titleAlign: "center",
        rightIcons: [
          {
            icon: inView ? ICON.search.white : ICON.search.black,
            alt: "Search",
            size: 20,
            onClick: handleSearch,
          },
        ],
      }}
    >
      <DetailCard
        title={city?.title!}
        name={city?.name}
        imageUrl={city?.imageUrl!}
        viewRef={viewRef}
      />
      <div className=" container w-full h-full flex-col pt-1 ">
        <div className="px-4">
          <Tab
            currentTab={currentTab!}
            setCurrentTab={setCurrentTab}
            TABS={TABS.default}
            isGray={true}
          />
        </div>
        <div className="pt-5 pb-10">
          {currentTab === "place" && (
            <SliderSection
              areas={areas?.place!}
              linkUrl={LinkUtils.CITY_AREA_LINK(cityId, "place")}
              title="문화 탐방"
              type="architect"
            />
          )}
          {currentTab === "accommodation" && (
            <SliderSection
              areas={areas?.accommodation!}
              linkUrl={LinkUtils.CITY_AREA_LINK(cityId, "accommodation")}
              title="할인하는 숙소"
              type="house"
            />
          )}
          {currentTab === "restaurant" && (
            <SliderSection
              areas={areas?.restaurant!}
              linkUrl={LinkUtils.CITY_AREA_LINK(cityId, "restaurant")}
              title="식도락"
              type="taco"
            />
          )}
          {currentTab === "shop" && (
            <SliderSection
              areas={areas?.shop!}
              linkUrl={LinkUtils.CITY_AREA_LINK(cityId, "shop")}
              title="쇼핑"
              type="friends"
            />
          )}
        </div>
        <div className="pb-10">
          <MainTourForm areasInfo={areas!} />
        </div>
      </div>
    </MainLayout>
  );
}

export default CityDetailPage;
