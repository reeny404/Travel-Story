"use client";

import { api } from "@/apis/api";
import CardType from "@/components/Card/CardType";
import Carousel from "@/components/Carousel/Carousel";
import Tab from "@/components/Tab/Tab";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import useRecommendStore from "@/stores/recommend.store";
import { Area, City, RecommendResponse } from "@/types/Recommend";
import { filterByAreaType } from "@/utils/filterByAreaType";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import DetailCard from "../../_components/Cards/DetailCard";
import CarouselItem from "../../_components/Carousel/CarouselItem";
import MainTourForm from "../../_components/MainTour/MainTourForm";

function CityDetailPage() {
  const { setCityId, cityId } = useRecommendStore();
  const pathname = usePathname();
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.default });

  useEffect(() => {
    const nowCityId = parseInt(pathname.split("/").slice(-1)[0]);
    setCityId(nowCityId);
  }, [pathname]);

  const { data: city } = useQuery<RecommendResponse<City>, AxiosError, City>({
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
  const placeCarouselItems: ReactNode[] = placeAreas?.map((place, idx) => {
    return (
      <>
        <CarouselItem
          description={place.description}
          imageUrl={place.imageUrl!}
          title={place.title}
          linkUrl={`/recommend/area/${place.id}`}
        />
      </>
    );
  });

  const accommodationAreasCarouselItems: ReactNode[] | undefined =
    accommodationAreas?.map((area, idx) => {
      return (
        <>
          <CarouselItem
            description={area.description}
            imageUrl={area.imageUrl!}
            title={area.title}
            linkUrl={`/recommend/area/${area.id}`}
          />
        </>
      );
    });

  return (
    <div className=" container overflow-x-hidden h-full max-w-[375px] flex-col ">
      <DetailCard
        title={city?.title!}
        description={city?.description!}
        imageUrl={city?.imageUrl!}
      />
      <Tab
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        TABS={TABS.default}
      />
      {currentTab === "accommodation" && (
        <>
          <CardType
            linkUrl={`/recommend/city/${cityId}/accommodation`}
            title="할인하는 숙소"
            type="home"
          />
          <Carousel slides={accommodationAreasCarouselItems} />
        </>
      )}
      {currentTab === "place" && (
        <>
          <CardType
            linkUrl={`/recommend/city/${cityId}/place`}
            title="문화 탐방"
            type="architect"
          />

          <Carousel slides={placeCarouselItems} />
        </>
      )}
      <MainTourForm areasInfo={areas!} />
    </div>
  );
}

export default CityDetailPage;
