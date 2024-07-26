"use client";

import { api } from "@/apis/api";
import CardForm from "@/components/Card/CardForm";
import CardType from "@/components/Card/CardType";
import ImageContainer from "@/components/Card/ImageContainer";
import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import DetailCard from "../../_components/DetailCard";
import RecommendForm from "../../_components/RecommendForm";
// TODO 케러셀  -> 스와이퍼.js로 수정하면서 데이터 수정
// 텝이 생기면 useState로 초기값에 대한 것을 부르고 탭이 바뀔 때마다 재 호출(쿼리키 = 탭 이름)
function CountryDetailPage() {
  const pathname = usePathname();
  const countryId = parseInt(pathname.split("/").slice(-1)[0]);

  const { data: country } = useQuery({
    queryKey: ["country", countryId],
    queryFn: () => api.country.getCountry(countryId),
  });

  const { data: areas } = useQuery({
    queryKey: ["areas"],
    queryFn: () => api.area.getCitiesByCountry(countryId, "accommodation"),
    select: (data) => data?.data,
  });

  const { data: place } = useQuery({
    queryKey: ["place"],
    queryFn: () => api.area.getCitiesByCountry(countryId, "place"),
    select: (data) => data?.data,
  });

  const { data: cities } = useQuery({
    queryKey: ["cities", countryId],
    queryFn: () => api.city.getCitiesByCountry(countryId),
    select: (data) => data?.data,
  });

  const carouselArr: ReactNode[] | undefined = areas?.map((area, idx) => {
    return (
      <div key={idx} className="embla__slide flex-none w-full ">
        <div className="flex flex-col relative">
          <ImageContainer isTitle size="area" imageUrl={area?.imageUrl!} />
          <CardForm
            intent="detail"
            title={area.title}
            description={area?.description!}
          />
        </div>
      </div>
    );
  });

  const placeCarouselArr: ReactNode[] | undefined = place?.map((area, idx) => {
    return (
      <div key={idx} className="embla__slide flex-none w-full ">
        <div className="flex flex-col relative">
          <ImageContainer isTitle size="area" imageUrl={area?.imageUrl!} />
          <CardForm
            intent="detail"
            title={area.title}
            description={area?.description!}
          />
        </div>
      </div>
    );
  });
  return (
    <div className=" container overflow-x-hidden w-screen h-screen max-w-[375px] mx-auto flex-col ">
      <DetailCard
        title={country?.data?.title!}
        description={country?.data.description!}
        imageUrl={country?.data.imageUrl!}
      />
      <div className="w-full h-10 bg-gray-300 ">탭바</div>
      <div className=" mb-10">
        <CardType
          linkUrl="/"
          title="할인하는 숙소"
          type="home"
          innerClassName="mt-5"
        />
        <CarouselWrapper items={carouselArr} />
      </div>
      <RecommendForm info={cities!} />
      <CardType linkUrl="/" title="문화 탐방" type="architect" />
      <CarouselWrapper items={placeCarouselArr} />
    </div>
  );
}

export default CountryDetailPage;
