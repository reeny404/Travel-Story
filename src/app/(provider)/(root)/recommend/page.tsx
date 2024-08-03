import CardType from "@/components/Card/CardType";
import Carousel from "@/components/Carousel/Carousel";
import ImageFrame from "@/components/Frame/ImageFrame";
import { ReactNode } from "react";
import ReviewCard from "./_components/Cards/ReviewCard";

// 상단에 띄울 4개의 나라는 하드코딩

function RecommendPage() {
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

  const slidesArr: ReactNode[] = slides.map((slide, idx) => {
    return (
      <div key={idx} className="flex-none w-full ">
        <div className="flex flex-col relative">
          {/* <AreaCard
            id={idx}
            title={slide.title}
            description={slide.desc}
            linkUrl="/"
            imageUrl={slide.imageUrl}
          /> */}
        </div>
      </div>
    );
  });

  const imgSildesArr: ReactNode[] = slides.map((slide, idx) => {
    return (
      <div key={idx} className="relative w-full h-[350px]">
        <ImageFrame
          src={slide.imageUrl}
          alt="img"
          className="h-full"
          roundType="sm"
        />
      </div>
    );
  });

  const countries = ["네덜란드", "독일", "이탈리아", "스페인"];
  const makeCountryCircles = (countries: string[]) => {
    return (
      <div className="flex justify-around mt-7">
        {countries.map((country: string) => {
          return (
            <div className="flex flex-col items-center" key={country}>
              <div className="w-16 h-16 bg-gray-500 rounded-full"></div>
              <p>{country}</p>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="container overflow-x-hidden  h-full w-full  flex-col ">
      <Carousel slides={imgSildesArr} />
      {makeCountryCircles(countries)}
      <div className="w-full h-20 bg-gray-400 flex justify-center items-center text-white mt-10">
        광고배너
      </div>
      <div className=" mb-10">
        <CardType title="할인하는 숙소" type="house" innerClassName="mt-5" />
      </div>
      <Carousel slides={slidesArr} />
      {/* <MainCityTemplate /> */}
      <ReviewCard
        title="장소명"
        description="회원 리뷰 내용 줄줄줄줄줄줄"
        rating={4}
        imageUrl={IMAGE_URL}
        linkUrl={"/"}
      />
    </div>
  );
}

export default RecommendPage;
