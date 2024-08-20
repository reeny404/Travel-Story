"use client";

import SvgIcon from "@/components/commons/SvgIcon";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useWindowSize } from "../_hook/useWindowSize";

function HomeBanner() {
  const { width } = useWindowSize();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full h-[222px] bg-neutral-200 md:w-full md:max-w-full md:h-[700px] overflow-visible">
      <div className="absolute top-0 bottom-0 left-1/2 w-screen -translate-x-1/2 bg-neutral-200">
        <Image
          src="/banners/main-banner1.svg"
          alt="banner"
          fill
          className="object-cover"
        />
      </div>
      <Image
        src="/banners/main-banner1.svg"
        alt="banner"
        fill
        className="object-cover"
      />
      <div className="relative z-10 flex flex-col items-start justify-start h-full pt-8 pl-8 md:pt-24 md:pl-16">
        <h3 className="mb-5 text-white text-2xl font-semibold leading-tight md:text-[44px] md:mb-20">
          2024 파리올림픽 <br /> 지금 떠나자!
        </h3>
        <Link href="/recommend/country/1/detail">
          <div
            className="group flex justify-center items-center px-4 py-2 border border-white text-sm text-white rounded-full hover:bg-white hover:text-black transition duration-300 md:text-xl md:px-6 md:py-2 "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            추천 여행지 보기
            <SvgIcon
              name="angle-right"
              width={width > 0 && width < 768 ? 16 : 20}
              height={width > 0 && width < 768 ? 16 : 20}
              title="arrow"
              className="transition-colors duration-300 md:ml-2"
              color={isHovered ? "primary" : "white"}
            />
          </div>
        </Link>
      </div>
    </section>
  );
}

export default HomeBanner;
