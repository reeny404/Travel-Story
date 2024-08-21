"use client";

import SvgIcon from "@/components/commons/SvgIcon";
import { BANNERS } from "@/constants/Banners";
import { dmSerifDisplayFont } from "@/constants/fonts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useWindowSize } from "../_hook/useWindowSize";

type BannerContentProps = {
  title: string;
  subtitle: string | string[];
  imagePath: string;
  link: string;
  bgGradient: string;
};

function BannerContent({
  title,
  subtitle,
  imagePath,
  link,
  bgGradient,
}: BannerContentProps) {
  const { width } = useWindowSize();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Image
        src={imagePath}
        alt="main banner"
        fill
        className="object-cover z-10"
      />

      <div className="relative z-20 flex flex-col items-start justify-start h-full pt-8 pl-8 main-banner-gradient md:pt-24 md:pl-16 md:bg-none">
        <div
          className={`flex flex-col justify-between items-start p-4 rounded-lg md:max-w-[420px] md:w-full md:max-h-[380px] md:h-full md:p-10 backdrop-blur`}
          style={{ background: bgGradient }}
        >
          <div>
            {Array.isArray(subtitle) ? (
              subtitle.map((line, index) => (
                <h3
                  key={index}
                  className="text-white text-lg font-semibold mb-3 leading-[135%] md:text-[40px] md:mb-0"
                >
                  {line}
                </h3>
              ))
            ) : (
              <h3 className="text-white text-lg font-semibold mb-3 leading-[135%] md:text-[40px] md:mb-0">
                {subtitle}
              </h3>
            )}
            <h3
              className={`${dmSerifDisplayFont.className} mb-5 text-white text-2xl leading-[120%] hidden md:block md:text-[96px]`}
            >
              {title}
            </h3>
          </div>
          <Link href={link}>
            <button
              className="group flex justify-center items-center px-4 py-2 border border-white text-xs text-white font-medium rounded-full hover:bg-white hover:text-black transition duration-300 md:text-xl md:px-5 md:py-2"
              type="button"
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
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

function HomeBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [blurImage, setBlurImage] = useState(BANNERS[0].blurImagepath);

  useEffect(() => {
    const nextBlurImage = new window.Image();
    nextBlurImage.src = BANNERS[currentSlide].blurImagepath;

    nextBlurImage.onload = () => {
      setBlurImage(BANNERS[currentSlide].blurImagepath);
    };
  }, [currentSlide]);

  return (
    <section className="relative w-full h-[222px] bg-neutral-200 md:w-full md:max-w-full md:h-[700px] overflow-visible z-10">
      <div className="absolute top-0 bottom-0 left-1/2 w-screen -translate-x-1/2 bg-neutral-200 z-0">
        <Image
          src={blurImage}
          alt="blurBanner"
          fill
          className="object-cover transition-opacity duration-500 ease-in-out animate-[fadeInOut_500ms_ease-in-out]"
          style={{ opacity: blurImage ? 1 : 0 }}
        />
      </div>

      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="w-full h-full"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={800}
        autoplay={{
          delay: 3000,
        }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
      >
        {BANNERS.map((banner, index) => (
          <SwiperSlide key={index}>
            <BannerContent {...banner} bgGradient={banner.bgGradient} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HomeBanner;
