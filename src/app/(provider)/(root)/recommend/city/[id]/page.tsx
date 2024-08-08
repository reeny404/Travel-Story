"use client";

import { api } from "@/apis/api";
import CardType from "@/components/Card/CardType";
import MainLayout from "@/components/Layout/MainLayout";
import CardSlider from "@/components/Slider/CardSlider";
import Tab from "@/components/Tab/Tab";
import { ICON } from "@/constants/icon";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import useRecommendStore from "@/stores/recommend.store";
import { Area, City, RecommendResponse } from "@/types/Recommend";
import { filterByAreaType } from "@/utils/filterByAreaType";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import DetailCard from "../../_components/Cards/DetailCard";
import MainTourForm from "../../_components/MainTour/MainTourForm";

type CityDetailPageProps = {
  params: { id: string };
};

function CityDetailPage({ params }: CityDetailPageProps) {
  const { setCityId, cityId } = useRecommendStore((state) => state);
  const { ref: viewRef, inView } = useInView();
  const router = useRouter();
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.default });

  useEffect(() => {
    setCityId(parseInt(params.id));
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
    queryKey: ["cityById", cityId],
    queryFn: () => api.city.getCityById(cityId),
    select: (data) => data?.data,
  });

  const { data: areas } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["areasByCity", cityId],
    queryFn: () => api.area.getAreasByCity(cityId),
    select: (data) => data?.data,
  });

  const accommodationAreas = filterByAreaType(areas!, "accommodation");

  const placeAreas = filterByAreaType(areas!, "place");
  const shopAreas = filterByAreaType(areas!, "shop");
  const restaurantAreas = filterByAreaType(areas!, "restaurant");

  const placeSliderProps = placeAreas?.map((place, idx) => {
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
      rating: place.rating!,
    };
  });
  const restaurantsSliderProps = restaurantAreas?.map((restaurant, idx) => {
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
      rating: restaurant.rating!,
    };
  });
  const shopsSliderProps = shopAreas?.map((shop, idx) => {
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
      rating: shop.rating!,
    };
  });
  const accommodationsSliderProps = accommodationAreas?.map(
    (accommodation, idx) => {
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
        rating: accommodation.rating!,
      };
    }
  );
  if (isPending) {
    return <div>loading...</div>;
  }
  return (
    <MainLayout
      headerProps={{
        backgroundColor: inView ? "transparent" : "whiteFixed",
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
          {currentTab === "accommodation" && (
            <>
              <CardType
                linkUrl={`/recommend/city/${cityId}/accommodation`}
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
          {currentTab === "place" && (
            <>
              <CardType
                linkUrl={`/recommend/city/${cityId}/place`}
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
          {currentTab === "restaurant" && (
            <div className="w-full">
              <CardType
                linkUrl={`/recommend/city/${cityId}/restaurant`}
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
            </div>
          )}
          {currentTab === "shop" && (
            <div className="w-full">
              <CardType
                linkUrl={`/recommend/city/${cityId}/shop`}
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
            </div>
          )}
        </div>
        <div className="pb-10">
          <MainTourForm areasInfo={areas!} />
        </div>
        <div className="pb-10">
          <CardType
            linkUrl={`/recommend/country/${cityId}/shop`}
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

export default CityDetailPage;
