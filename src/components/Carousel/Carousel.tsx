"use client";

import { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

type CarouselProps = { slides: ReactNode[] | string[] };
// 이곳에 JSX로 이루어진 데이터 베열을 넣는다면 이를 케러셀로 리턴해줍니다.
// 슬라이드 데이터를 많이 넣으면 warning이 사라질 것이다....
const Carousel = ({ slides }: CarouselProps) => {
  return (
    <section>
      <Swiper className="rounded-sm" loop={true} grabCursor={true}>
        {slides?.map((slide, idx) => {
          return (
            <SwiperSlide key={idx} className={`md:max-w-[466px]`}>
              {slide}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Carousel;
