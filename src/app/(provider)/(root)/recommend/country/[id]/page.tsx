"use client";

import { api } from "@/apis/api";
import CardForm from "@/components/Card/CardForm";
import CardType from "@/components/Card/CardType";
import ImageContainer from "@/components/Card/ImageContainer";
import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import Tab from "@/components/Tab/Tab";
import { useTab } from "@/hooks/useTab";
import useRecommendStore from "@/stores/recommend.store";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import DetailCard from "../../_components/DetailCard";
import RecommendForm from "../../_components/RecommendForm";
// TODO 케러셀  -> 스와이퍼.js로 수정하면서 데이터 수정
// 텝이 생기면 useState로 초기값에 대한 것을 부르고 탭이 바뀔 때마다 재 호출(쿼리키 = 탭 이름)
function CountryDetailPage() {
  const { countryId, setCountryId } = useRecommendStore();
  const { currentTab } = useTab();
  const pathname = usePathname();

  useEffect(() => {
    const nowCountryId = parseInt(pathname.split("/").slice(-1)[0]);
    setCountryId(nowCountryId);
  }, []);

  const { data: country } = useQuery({
    queryKey: ["country", countryId],
    queryFn: () => api.country.getCountry(countryId),
  });

  const { data: areas } = useQuery({
    queryKey: ["areas", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, "accommodation"),
    select: (data) => data?.data,
  });

  const { data: place } = useQuery({
    queryKey: ["place", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, "place"),
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
            linkUrl="/"
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
            linkUrl="/"
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
      <Tab />
      {currentTab === "accommodation" && (
        <div className=" mb-10">
          <CardType
            linkUrl={`/recommend/country/${countryId}/accommodation`}
            title="할인하는 숙소"
            type="home"
          />
          <CarouselWrapper items={carouselArr} />
        </div>
      )}
      {currentTab === "place" && (
        <>
          <CardType
            linkUrl={`/recommend/country/${countryId}/place`}
            title="문화 탐방"
            type="architect"
          />
          <CarouselWrapper items={placeCarouselArr} />
        </>
      )}
      <RecommendForm info={cities!} />
    </div>
  );
}

export default CountryDetailPage;
