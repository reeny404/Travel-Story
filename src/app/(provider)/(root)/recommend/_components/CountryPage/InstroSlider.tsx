"use client";

import { dmSerifDisplayFont } from "@/constants/fonts";
import { City } from "@/types/Recommend";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type IntroSliderProps = {
  title: string;
  imageUrl: string | null;
  countryId: number;
  cities: City[];
};
function InstroSlider(country: IntroSliderProps) {
  const router = useRouter();

  //
  return (
    <Swiper
      touchRatio={0.1}
      onSlideChange={() =>
        router.push(`/recommend/country/${country.countryId}/detail`)
      }
      className="w-full h-screen"
    >
      <SwiperSlide className="relative aspect-auto h-full">
        <div className="relative w-full h-full min-h-[812px] flex flex-col justify-center items-center aspect-4/5">
          <div className="absolute ws-full -z-10 inset-0 bg-black opacity-40"></div>
          <picture>
            <Image
              src={country.imageUrl! ?? "/"}
              alt={country.title}
              fill
              priority
              className="object-cover -z-20"
            />
          </picture>
          <h1
            className={`${dmSerifDisplayFont.className} mt-[140px] pb-8 text-[64px] leading-[76.8px] text-white`}
          >
            {country.title}
          </h1>

          <div
            className={`w-full flex flex-col justify-center items-center gap-y-[9px]`}
          >
            <p className="text-white">.</p>
            {country.cities.map((city, idx) => {
              return (
                <Link
                  key={city.id}
                  href={`/recommend/city/${city.id}`}
                  className="w-full px-4 py-[10px] font-semibold text-center text-white"
                >
                  {city.krName}
                </Link>
              );
            })}
          </div>
          <Link
            href={`/recommend/country/${country.countryId}/detail`}
            className="flex relative font-medium justify-center text-brand-300 gap-x-4 items-center mt-[141px] mb-[93px] w-[240px] h-10 pr-6 pl-7 border-[0.6px] border-brand-300 hover:bg-brand-300 hover:text-primary rounded-[28px]"
          >
            <div className="absolute w-full -z-10 inset-0 rounded-[28px] bg-black opacity-30"></div>
            <p>이 곳으로 떠나기</p>
            {/* <Image
              src="/icons/line-yellow.svg"
              alt="line"
              width={60}
              height={1}
            /> */}
            {/* mt-[0.063rem] */}
            <div className="flex h-full justify-center items-center">
              <div className="w-[60px] h-[1px]  bg-current"></div>
              <div className="w-[4px] h-[4px]  bg-current rounded-full"></div>
            </div>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide></SwiperSlide>
    </Swiper>
  );
}

export default InstroSlider;
