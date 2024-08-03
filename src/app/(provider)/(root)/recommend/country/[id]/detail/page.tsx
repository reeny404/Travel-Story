"use client";

import { api } from "@/apis/api";
import CardType from "@/components/Card/CardType";
import Carousel from "@/components/Carousel/Carousel";
import MainLayout from "@/components/Layout/MainLayout";
import Tab from "@/components/Tab/Tab";
import { ICON } from "@/constants/icon";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import useDrawerStore from "@/stores/drawer.store";
import { Area, Country, RecommendResponse } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ReactNode } from "react";
import DetailCard from "../../../_components/Cards/DetailCard";
import CarouselItem from "../../../_components/Carousel/CarouselItem";
import MainTourForm from "../../../_components/MainTour/MainTourForm";
// 텝이 생기면 useState로 초기값에 대한 것을 부르고 탭이 바뀔 때마다 재 호출(쿼리키 = 탭 이름)
// 이 페이지는 SSR이여야함

type CountryDetailPage = {
  params: { id: string };
};

function CountryDetailPage({ params }: CountryDetailPage) {
  const countryId = parseInt(params.id);
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.default });
  const { openDrawer } = useDrawerStore();
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

  const areaCarouselItems: ReactNode[] | undefined = accommodations?.map(
    (accommodation, idx) => {
      return (
        <>
          <CarouselItem
            id={accommodation.id}
            rating={accommodation.rating!}
            description={accommodation.description}
            imageUrl={accommodation.imageUrl!}
            title={accommodation.title}
            linkUrl={`/recommend/area/${accommodation.id}`}
            city={accommodation.info.location[1]}
            country={accommodation.info.location[0]}
            areaName={accommodation.krName!}
          />
        </>
      );
    }
  );
  const placeCarouselItems: ReactNode[] | undefined = places?.map(
    (place, idx) => {
      return (
        <>
          <CarouselItem
            id={place.id}
            rating={place.rating!}
            description={place.description}
            imageUrl={place.imageUrl!}
            title={place.title}
            linkUrl={`/recommend/area/${place.id}`}
            city={place.info.location[1]}
            country={place.info.location[0]}
            areaName={place.krName!}
          />
        </>
      );
    }
  );
  const restaurantCarouselItems: ReactNode[] | undefined = restaurants?.map(
    (restaurant, idx) => {
      return (
        <>
          <CarouselItem
            id={restaurant.id}
            rating={restaurant.rating!}
            description={restaurant.description}
            imageUrl={restaurant.imageUrl!}
            title={restaurant.title}
            linkUrl={`/recommend/area/${restaurant.id}`}
            city={restaurant.info.location[1]}
            country={restaurant.info.location[0]}
            areaName={restaurant.krName!}
          />
        </>
      );
    }
  );
  const shopCarouselItems: ReactNode[] | undefined = shops?.map((shop, idx) => {
    return (
      <>
        <CarouselItem
          id={shop.id}
          rating={shop.rating!}
          description={shop.description}
          imageUrl={shop.imageUrl!}
          title={shop.title}
          linkUrl={`/recommend/area/${shop.id}`}
          city={shop.info.location[1]}
          country={shop.info.location[0]}
          areaName={shop.krName!}
        />
      </>
    );
  });

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        leftIcons: [
          {
            icon: ICON.arrow.back.black,
            alt: "Back",
            size: 20,
            path: "back",
          },
        ],
        title: country?.data.krName!,
        titleAlign: "center",
        rightIcons: [
          {
            icon: ICON.search.black,
            alt: "Search",
            size: 20,
            onClick: () => {},
          },
          {
            icon: ICON.menu.burgerBlack,
            alt: "Menu",
            size: 20,
            onClick: openDrawer,
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
            <div className="w-full">
              <CardType
                linkUrl={`/recommend/country/${countryId}/place`}
                title="문화 탐방"
                type="architect"
              />
              <Carousel slides={placeCarouselItems!} />
            </div>
          )}
          {currentTab === "accommodation" && (
            <div className="w-full">
              <CardType
                linkUrl={`/recommend/country/${countryId}/accommodation`}
                title="할인하는 숙소"
                type="house"
              />
              <Carousel slides={areaCarouselItems!} />
            </div>
          )}

          {currentTab === "restaurant" && (
            <div className="w-full">
              <CardType
                linkUrl={`/recommend/country/${countryId}/restaurant`}
                title="식도락"
                type="taco"
              />
              <Carousel slides={restaurantCarouselItems!} />
            </div>
          )}
          {currentTab === "shop" && (
            <div className="w-full">
              <CardType
                linkUrl={`/recommend/country/${countryId}/shop`}
                title="쇼핑"
                type="friends"
              />
              <Carousel slides={shopCarouselItems!} />
            </div>
          )}
        </div>
        <div className="pb-10">
          <MainTourForm areasInfo={accommodations!} />
        </div>
        <div className="w-full pb-10">
          <CardType
            linkUrl={`/recommend/country/${countryId}/place`}
            title="친구와 함꼐"
            type="friends"
          />
          <Carousel slides={shopCarouselItems!} />
        </div>
      </div>
    </MainLayout>
  );
}

export default CountryDetailPage;
