"use client";

import Image from "next/image";
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
    <div className="w-full h-full">
      <Swiper
        touchRatio={0.1}
        onSlideChange={() =>
          router.push(`/recommend/country/${country.countryId}/detail`)
        }
      >
        <SwiperSlide className="w-full h-full relative">
          <div className="w-full h-[350px] relative aspect-auto">
            <Image
              src={country.imageUrl || "/"}
              alt={country.title}
              fill
              sizes="width:auto, height:auto"
              className="object-auto"
            />
          </div>

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
