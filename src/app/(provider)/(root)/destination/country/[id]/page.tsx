import CardForm from "@/components/Card/CardForm";
import CardType from "@/components/Card/CardType";
import ImageContainer from "@/components/Card/ImageContainer";
import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import { ReactNode } from "react";
import DetailCard from "../../_components/DetailCard";

function CountryDetailPage() {
  const IMAGE_URL =
    "https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg";

  const slides = [
    {
      title: "숙소명",
      desc: "고대의 역사가 살아숨쉬는 도시",
      rating: 4,
      imageUrl: IMAGE_URL,
      areaId: 1,
    },
    {
      title: "다른 숙소명",
      desc: "바뀐놈",
      rating: 5,
      imageUrl: IMAGE_URL,
      areaId: 2,
    },
    {
      title: "또 다른 숙소명",
      desc: "3번째 놈",
      rating: 2,
      imageUrl: IMAGE_URL,
      areaId: 3,
    },
  ];

  const carouselArr: ReactNode[] = slides.map((slide, idx) => {
    return (
      <div key={idx} className="embla__slide flex-none w-full ">
        <div className="flex flex-col relative">
          <ImageContainer isTitle size="area" imageUrl={slide.imageUrl} />
          <CardForm
            intent="detail"
            title={slide.title}
            description={slide.desc}
            rating={slide.rating}
          />
        </div>
      </div>
    );
  });

  return (
    <div className=" container overflow-x-hidden w-screen h-screen max-w-[375px] mx-auto flex-col ">
      <DetailCard
        title="르네상스의 발상지, 예술과 낭만의 중심 이탈리아"
        description="여행지 소개 여행지 소개 여행지 소개 여행지 소개 여행지 소개 여행지 소개여행지 소개여행지 소개여행지 소개"
        imageUrl={IMAGE_URL}
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
    </div>
  );
}

export default CountryDetailPage;
