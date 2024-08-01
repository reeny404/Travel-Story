"use client";

import ImageFrame from "@/components/Frame/ImageFrame";
import { useRouter } from "next/navigation";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type IntroSliderProps = {
  title: string;
  imageUrl: string | null;
  countryId: number;
};
function InstroSlider(country: IntroSliderProps) {
  const router = useRouter();

  return (
    <div className="w-full">
      <Swiper
        touchRatio={0.1}
        onSlideChange={() =>
          router.push(`/recommend/country/${country.countryId}/detail`)
        }
      >
        <SwiperSlide className="relative">
          <ImageFrame
            src={country.imageUrl}
            roundType="sm"
            alt="countryImage"
            className="h-[400px] w-full"
          />
          <h1 className="absolute bottom-0 left-0 text-6xl font-bold">
            {country.title}
          </h1>
        </SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default InstroSlider;
