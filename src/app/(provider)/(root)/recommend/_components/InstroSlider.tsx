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
          router.push(`/recommend/country/${country.countryId}`)
        }
      >
        <SwiperSlide>
          <ImageFrame
            src={country.imageUrl}
            roundType="sm"
            alt="countryImage"
            className="h-[530px]"
          />
        </SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default InstroSlider;
