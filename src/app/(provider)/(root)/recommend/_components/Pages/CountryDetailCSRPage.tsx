"use client";

import MainLayout from "@/components/Layout/MainLayout";
import ImageSlider from "@/components/Slider/SmImageSlider";
import Tab from "@/components/Tab/Tab";
import { ICON } from "@/constants/icon";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import { City, Country, GroupedArea } from "@/types/Recommend";
import { LinkUtils } from "@/utils/LinkUtils";
import { Query, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Suspense, lazy, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import DetailCard from "../Cards/DetailCard";
const SliderSection = lazy(() => import("../SliderSection"));
const MainTourForm = lazy(() => import("../MainTour/MainTourForm"));

type CountryDetailCSRPage = {
  countryId: number;
  dehydratedState: any;
};

function CountryDetailCSRPage({
  countryId,
  dehydratedState,
}: CountryDetailCSRPage) {
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.default });
  const { ref: viewRef, inView } = useInView();
  const router = useRouter();

  const handleSearch = () => {
    return router.push(`/search`);
  };

  const { data: country } = useQuery<Country>({
    queryKey: ["country", countryId],
    initialData: dehydratedState.queries.find(
      (q: Query) => q.queryKey[0] === "country"
    )?.state.data,
  });

  const { data: cities } = useQuery<City[]>({
    queryKey: ["city", countryId],
    initialData: dehydratedState.queries.find(
      (q: Query) => q.queryKey[0] === "city"
    )?.state.data,
  });

  const { data: areas } = useQuery<GroupedArea>({
    queryKey: ["areas", countryId],
    initialData: dehydratedState.queries.find(
      (q: Query) => q.queryKey[0] === "areas"
    )?.state.data,
  });

  useEffect(() => {
    setCurrentTab("place");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout
      headerProps={{
        backgroundColor: inView ? "transparentFixed" : "whiteFixed",
        title: inView ? "" : country?.krName!,
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
        title={country?.title!}
        name={country?.name}
        imageUrl={country?.imageUrl!}
        viewRef={viewRef}
      />
      <div className=" container overflow-auto w-full h-full flex-col">
        <div className="w-full h-[82px] mb-1 mt-5">
          {cities && (
            <ImageSlider cards={cities} spacing={0} slidesPerView={4.5} />
          )}
        </div>
        <Tab
          TABS={TABS.default}
          currentTab={currentTab!}
          setCurrentTab={setCurrentTab}
          frameClassName="px-4"
          isGray={true}
        />
        <div className="pt-5 pb-4">
          {currentTab === "place" && (
            <SliderSection
              areas={areas?.place!}
              linkUrl={LinkUtils.COUNTRY_AREA_LINK(countryId, "place")}
              title="문화 탐방"
              type="architect"
            />
          )}
          {currentTab === "accommodation" && (
            <SliderSection
              areas={areas?.accommodation!}
              linkUrl={LinkUtils.COUNTRY_AREA_LINK(countryId, "accommodation")}
              title="할인하는 숙소"
              type="house"
            />
          )}

          {currentTab === "restaurant" && (
            <SliderSection
              areas={areas?.restaurant!}
              linkUrl={LinkUtils.COUNTRY_AREA_LINK(countryId, "restaurant")}
              title="식도락"
              type="taco"
            />
          )}
          {currentTab === "shop" && (
            <SliderSection
              areas={areas?.shop!}
              linkUrl={LinkUtils.COUNTRY_AREA_LINK(countryId, "shop")}
              title="쇼핑"
              type="friends"
            />
          )}
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="pb-10">
            <MainTourForm areasInfo={areas!} />
          </div>
        </Suspense>
      </div>
    </MainLayout>
  );
}

export default CountryDetailCSRPage;
