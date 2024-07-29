"use client";

import ImageContainer from "@/components/Card/ImageContainer";
import { useRouter } from "next/navigation";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type IntroSliderProps = {
  title: string;
  imageUrl: string;
  countryId: number;
};
function InstroSlider(country: IntroSliderProps) {
  const router = useRouter();

  return (
    <div className="w-[350px] h-[500px]">
      <Swiper
        touchRatio={0.1}
        onSlideChange={() =>
          router.push(`/recommend/country/${country.countryId}`)
        }
      >
        <SwiperSlide>
          <ImageContainer
            isTitle={true}
            title={country.title}
            size="intro"
            imageUrl={country.imageUrl || "/123"}
          />
        </SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default InstroSlider;
