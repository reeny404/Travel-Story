"use client";

import { api } from "@/apis/api";
import CardType from "@/components/Card/CardType";
import MainLayout from "@/components/Layout/MainLayout";
import CardSlider from "@/components/Slider/CardSlider";
import Tab from "@/components/Tab/Tab";
import { ICON } from "@/constants/icon";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import { Area, Country, RecommendResponse } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import DetailCard from "../../../_components/Cards/DetailCard";
import MainTourForm from "../../../_components/MainTour/MainTourForm";
// 텝이 생기면 useState로 초기값에 대한 것을 부르고 탭이 바뀔 때마다 재 호출(쿼리키 = 탭 이름)
// 이 페이지는 SSR이여야함
//TODO  query 호춣을 최대한 줄여서 메모이제이션으로 관리해야 할 필요가 있음 그 후 헤더가 부자연스러운 부분을 파악해야될 것 같음

type CountryDetailPage = {
  params: { id: string };
};

function CountryDetailPage({ params }: CountryDetailPage) {
  const countryId = parseInt(params.id);
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.default });
  const { ref: viewRef, inView } = useInView();
  const router = useRouter();
  const { data: country } = useQuery<RecommendResponse<Country>>({
    queryKey: ["countryDetail", countryId],
    queryFn: () => api.country.getCountry(countryId),
  });

  const handleSearch = () => {
    return router.push(`/search`);
  };

  const { data: accommodations } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["accomodationAreas", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, "accommodation"),
    select: (data) => {
      return data?.data;
    },
    staleTime: 1000 * 60 * 60,
  });
  const { data: places } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["placeAreas", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, "place"),
    select: (data) => {
      return data?.data;
    },
    staleTime: 1000 * 60 * 60,
  });
  const { data: restaurants } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["restaurantAreas", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, "restaurant"),
    select: (data) => {
      return data?.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const { data: shops } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["shopAreas", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, "shop"),
    select: (data) => {
      return data?.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const placeSliderProps = useMemo(() => {
    return places?.map((place, idx) => {
      return {
        title: place.title,
        description: place.description,
        imageUrl: place.imageUrl!,
        linkUrl: `/recommend/area/${place.id}`,
        tags: ["친구와 함께", "문화체험", "도심"],
        id: place.id,
        city: place.info.location[1],
        country: place.info.location[0],
        areaName: place.krName!,
      };
    });
  }, [places]);
  const restaurantsSliderProps = useMemo(() => {
    return restaurants?.map((restaurant, idx) => {
      return {
        title: restaurant.title,
        description: restaurant.description,
        imageUrl: restaurant.imageUrl!,
        linkUrl: `/recommend/area/${restaurant.id}`,
        tags: ["친구와 함께", "문화체험", "도심"],
        id: restaurant.id,
        city: restaurant.info.location[1],
        country: restaurant.info.location[0],
        areaName: restaurant.krName!,
      };
    });
  }, [restaurants]);

  const shopsSliderProps = useMemo(() => {
    return shops?.map((shop, idx) => {
      return {
        title: shop.title,
        description: shop.description,
        imageUrl: shop.imageUrl!,
        linkUrl: `/recommend/area/${shop.id}`,
        tags: ["친구와 함께", "문화체험", "도심"],
        id: shop.id,
        city: shop.info.location[1],
        country: shop.info.location[0],
        areaName: shop.krName!,
      };
    });
  }, [shops]);

  const accommodationsSliderProps = useMemo(() => {
    return accommodations?.map((accommodation, idx) => {
      return {
        title: accommodation.title,
        description: accommodation.description,
        imageUrl: accommodation.imageUrl!,
        linkUrl: `/recommend/area/${accommodation.id}`,
        tags: ["친구와 함께", "문화체험", "도심"],
        id: accommodation.id,
        city: accommodation.info.location[1],
        country: accommodation.info.location[0],
        areaName: accommodation.krName!,
      };
    });
  }, [accommodations]);
  if (!country) {
    return <div>loading....</div>;
  }
  return (
    <MainLayout
      headerProps={{
        backgroundColor: inView ? "transparent" : "whiteFixed",
        title: inView ? "" : country.data.krName!,
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
        title={country?.data?.title!}
        // description={country?.data?.description!}
        imageUrl={country?.data?.imageUrl!}
        viewRef={viewRef}
      />
      <div className=" container overflow-auto w-full h-full flex-col pt-1 ">
        <Tab
          TABS={TABS.default}
          currentTab={currentTab!}
          setCurrentTab={setCurrentTab}
          frameClassName="px-4"
          isGray={true}
        />
        <div className="pt-5 pb-4">
          {currentTab === "place" && (
            <>
              <CardType
                linkUrl={`/recommend/country/${countryId}/place`}
                title="문화 탐방"
                type="architect"
              />
              {placeSliderProps && (
                <CardSlider
                  spacing={20}
                  slidesPerView={1.2}
                  cards={placeSliderProps!}
                />
              )}
            </>
          )}
          {currentTab === "accommodation" && (
            <>
              <CardType
                linkUrl={`/recommend/country/${countryId}/accommodation`}
                title="할인하는 숙소"
                type="house"
              />
              {accommodationsSliderProps && (
                <CardSlider
                  spacing={20}
                  slidesPerView={1.2}
                  cards={accommodationsSliderProps!}
                />
              )}
            </>
          )}

          {currentTab === "restaurant" && (
            <>
              <CardType
                linkUrl={`/recommend/country/${countryId}/restaurant`}
                title="식도락"
                type="taco"
              />
              {restaurantsSliderProps && (
                <CardSlider
                  spacing={20}
                  slidesPerView={1.2}
                  cards={restaurantsSliderProps!}
                />
              )}
            </>
          )}
          {currentTab === "shop" && (
            <>
              <CardType
                linkUrl={`/recommend/country/${countryId}/shop`}
                title="쇼핑"
                type="friends"
              />
              {shopsSliderProps && (
                <CardSlider
                  spacing={20}
                  slidesPerView={1.2}
                  cards={shopsSliderProps!}
                />
              )}
            </>
          )}
        </div>
        <div className="pb-10">
          <MainTourForm areasInfo={accommodations!} />
        </div>
        <div className="pb-4">
          <CardType
            linkUrl={`/recommend/country/${countryId}/shop`}
            title="친구와 함께"
            type="friends"
          />
          {placeSliderProps && (
            <CardSlider
              spacing={20}
              slidesPerView={1.2}
              cards={placeSliderProps!}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default CountryDetailPage;
