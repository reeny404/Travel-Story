/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { api } from "@/apis/api";
import CardForm from "@/components/Card/CardForm";
import CardType from "@/components/Card/CardType";
import ImageContainer from "@/components/Card/ImageContainer";
import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import useRecommendStore from "@/stores/recommend.store";
import { filterByAreaType } from "@/utils/filterByAreaType";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import DetailCard from "../../_components/DetailCard";

function CityDetailPage() {
  const { setCityId, cityId } = useRecommendStore();
  const pathname = usePathname();

  useEffect(() => {
    const cityId = parseInt(pathname.split("/").slice(-1)[0]);
    setCityId(cityId);
  }, [pathname]);

  const { data: city } = useQuery({
    queryKey: ["city", cityId],
    queryFn: () => api.city.getCityById(cityId),
    select: (data) => data?.data,
  });

  const { data: areas } = useQuery({
    queryKey: ["areas", cityId],
    queryFn: () => api.area.getCitiesByCity(cityId),
    select: (data) => data?.data,
    staleTime: 1000 * 10,
  });

  const accomodationAreas = filterByAreaType(areas!, "accommodation");

  const placeAreas = filterByAreaType(areas!, "place");

  const placeCarouselArr: ReactNode[] | undefined = placeAreas?.map(
    (area, idx) => {
      return (
        <div key={idx} className="embla__slide flex-none w-full ">
          <div className="flex flex-col relative">
            <ImageContainer isTitle size="area" imageUrl={area?.imageUrl!} />
            <CardForm
              intent="detail"
              title={area.title}
              description={area?.description!}
              rating={4}
            />
          </div>
        </div>
      );
    }
  );

  const carouselArr: ReactNode[] | undefined = accomodationAreas?.map(
    (area, idx) => {
      return (
        <div key={idx} className="embla__slide flex-none w-full ">
          <div className="flex flex-col relative">
            <ImageContainer isTitle size="area" imageUrl={area?.imageUrl!} />
            <CardForm
              intent="detail"
              title={area.title}
              description={area?.description!}
              rating={4}
            />
          </div>
        </div>
      );
    }
  );

  return (
    <div className=" container overflow-x-hidden w-screen h-screen max-w-[375px] mx-auto flex-col ">
      <DetailCard
        title={city?.title!}
        description={city?.description!}
        imageUrl={city?.imageUrl!}
      />
      <div className="w-full h-10 bg-gray-300 ">탭바</div>
      <CardType
        linkUrl="/recommend/area/accommodation"
        title="할인하는 숙소"
        type="home"
      />
      <CarouselWrapper items={carouselArr} />
      {/* <RecommendForm key={1} info={areas!} /> */}
      <CardType
        linkUrl="/recommend/area/place"
        title="문화 탐방"
        type="architect"
      />
      <CarouselWrapper items={placeCarouselArr} />
    </div>
  );
}

export default CityDetailPage;
