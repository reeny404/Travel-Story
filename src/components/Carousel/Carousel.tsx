"use client";

import { ReactNode } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

type CarouselProps = { slides: ReactNode[] | string[] };
// 이곳에 JSX로 이루어진 데이터 베열을 넣는다면 이를 케러셀로 리턴해줍니다.

const Carousel = ({ slides }: CarouselProps) => {
  return (
    <section>
      <Swiper
        className="rounded-sm"
        modules={[Pagination, Autoplay]}
        loop={true}
        pagination={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
      >
        {slides?.map((slide) => {
          return <SwiperSlide>{slide}</SwiperSlide>;
        })}
      </Swiper>
    </section>
  );
};

export default Carousel;
