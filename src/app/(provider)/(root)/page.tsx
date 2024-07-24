import CardForm from "@/components/Card/CardForm";
import ImageContainer from "@/components/Card/ImageContainer";
import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import { ReactNode } from "react";

export default function Home() {
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
      <div key={idx} className="embla__slide flex-none w-3/4 ">
        <div className="flex flex-col relative">
          <ImageContainer isTitle size="recommend" imageUrl={slide.imageUrl} />
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
    <div className="container overflow-hidden w-screen h-screen max-w-[375px] mx-auto ">
      <CarouselWrapper items={carouselArr} />
    </div>
  );
}
