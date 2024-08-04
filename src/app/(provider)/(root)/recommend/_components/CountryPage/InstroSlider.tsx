"use client";

import { IntroDataType } from "@/types/Recommend";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "swiper/css";

type IntroSliderProps = {
  title: string;
  imageUrl: string | null;
  countryId: number;
  cities: IntroDataType["cities"];
};
function InstroSlider(country: IntroSliderProps) {
  const router = useRouter();

  //   <Swiper
  //   touchRatio={0.1}
  //   onSlideChange={() =>
  //     router.push(`/recommend/country/${country.countryId}/detail`)
  //   }
  //   className="w-full h-full"
  // >
  //   <SwiperSlide className="relative aspect-auto h-full">
  //     {/* <Image
  //         src={country.imageUrl || "/"}
  //         alt={country.title}
  //         fill
  //         className="object-cover -z-10"
  //       /> */}
  // </SwiperSlide>
  // </Swiper>
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center aspect-4/5">
      <div className="absolute w-full -z-20 inset-0 bg-black opacity-40"></div>
      <Image
        src={country.imageUrl || "/"}
        alt={country.title}
        fill
        className="object-cover -z-30"
      />
      <h1 className="mt-[140px] pb-8  text-6xl font-bold text-white">
        {country.title}
      </h1>
      <div className="w-full flex flex-col justify-center items-center gap-y-[9px]">
        <p className="text-white">.</p>
        {country.cities.map((city, idx) => {
          return (
            <Link
              key={city.id}
              href={`/recommend/city/${city.id}`}
              className="w-full px-4 py-[10px] font-semibold text-center text-white"
            >
              {city.name}
            </Link>
          );
        })}
      </div>
      <Link
        href={`/recommend/country/${country.countryId}/detail`}
        className="flex justify-center text-brand-300 gap-x-4 items-center mt-[141px] mb-[93px] w-[240px] h-10 pr-6 pl-7 border-[0.6px] border-brand-300 rounded-[28px]"
      >
        <p>이 곳으로 떠나기</p>
        <Image src="/icons/line-yellow.svg" alt="line" width={60} height={1} />
      </Link>
    </div>
  );
}

export default InstroSlider;
