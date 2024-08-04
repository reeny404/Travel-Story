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
import DetailCard from "../../../_components/Cards/DetailCard";
import MainTourForm from "../../../_components/MainTour/MainTourForm";
// 텝이 생기면 useState로 초기값에 대한 것을 부르고 탭이 바뀔 때마다 재 호출(쿼리키 = 탭 이름)
// 이 페이지는 SSR이여야함

type CountryDetailPage = {
  params: { id: string };
};

function CountryDetailPage({ params }: CountryDetailPage) {
  const countryId = parseInt(params.id);
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.default });
  const { data: country } = useQuery<RecommendResponse<Country>>({
    queryKey: ["countryDetail", countryId],
    queryFn: () => api.country.getCountry(countryId),
  });

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
  });

  const placeSliderProps = places?.map((place, idx) => {
    return {
      title: place.title,
      description: place.description,
      imageUrl: place.imageUrl!,
      linkUrl: `/recommend/area${place.id}`,
      tags: ["친구와 함께", "문화체험", "도심"],
      id: place.id,
      city: place.info.location[1],
      country: place.info.location[0],
      areaName: place.krName!,
    };
  });
  const restaurantsSliderProps = restaurants?.map((restaurant, idx) => {
    return {
      title: restaurant.title,
      description: restaurant.description,
      imageUrl: restaurant.imageUrl!,
      linkUrl: `/recommend/area${restaurant.id}`,
      tags: ["친구와 함께", "문화체험", "도심"],
      id: restaurant.id,
      city: restaurant.info.location[1],
      country: restaurant.info.location[0],
      areaName: restaurant.krName!,
    };
  });
  const shopsSliderProps = shops?.map((shop, idx) => {
    return {
      title: shop.title,
      description: shop.description,
      imageUrl: shop.imageUrl!,
      linkUrl: `/recommend/area${shop.id}`,
      tags: ["친구와 함께", "문화체험", "도심"],
      id: shop.id,
      city: shop.info.location[1],
      country: shop.info.location[0],
      areaName: shop.krName!,
    };
  });
  const accommodationsSliderProps = accommodations?.map(
    (accommodation, idx) => {
      return {
        title: accommodation.title,
        description: accommodation.description,
        imageUrl: accommodation.imageUrl!,
        linkUrl: `/recommend/area${accommodation.id}`,
        tags: ["친구와 함께", "문화체험", "도심"],
        id: accommodation.id,
        city: accommodation.info.location[1],
        country: accommodation.info.location[0],
        areaName: accommodation.krName!,
      };
    }
  );

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: country?.data.krName!,
        titleAlign: "center",
        rightIcons: [
          {
            icon: ICON.search.black,
            alt: "Search",
            size: 20,
            onClick: () => {},
          },
        ],
      }}
    >
      <DetailCard
        title={country?.data?.title!}
        description={country?.data?.description!}
        imageUrl={country?.data?.imageUrl!}
      />
      <div className=" container w-full h-full flex-col pt-1 ">
        <div className=" px-4">
          <Tab
            TABS={TABS.default}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </div>
        <div className="pt-5 pb-10">
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
        <div className="pb-10">
          <CardType
            linkUrl={`/recommend/country/${countryId}/shop`}
            title="친구와 함께"
            type="friends"
          />
          {shopsSliderProps && (
            <CardSlider
              spacing={20}
              slidesPerView={1.2}
              cards={shopsSliderProps!}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default CountryDetailPage;
