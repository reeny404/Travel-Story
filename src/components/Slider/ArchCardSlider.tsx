"use client";

import ArchCard from "@/app/(provider)/(root)/_components/ArchCard";
import { useWindowSize } from "@/app/(provider)/(root)/_hook/useWindowSize";
import { POPULAR_DESTINATIONS } from "@/constants/popular";
import clsx from "clsx";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

function ArchCardSlider({ isInitial }: { isInitial?: boolean }) {
  const [spaceBetween, setSpaceBetween] = useState<number>(12);
  const windowSize = useWindowSize();
  const [swiperStyle, setSwiperStyle] = useState<React.CSSProperties>({
    overflow: "hidden",
  });

  useEffect(() => {
    if (!windowSize.width) return;
    setSwiperStyle({ overflow: "hidden" });

    if (windowSize.width >= 1280) {
      setSpaceBetween(28);
      setSwiperStyle({ overflow: "visible" });
      return;
    }

    if (windowSize.width >= 1024) {
      setSpaceBetween(24);
      return;
    }

    if (windowSize.width >= 768) {
      setSpaceBetween(18);
      return;
    }

    setSpaceBetween(12);
  }, [windowSize.width]);

  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={3.8}
      grabCursor={true}
      breakpoints={{
        500: {
          slidesPerView: 4.8,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 12,
        },
        1280: {
          slidesPerView: 8,
          spaceBetween: 30,
        },
      }}
      style={swiperStyle}
    >
      {POPULAR_DESTINATIONS.map((card, index) => (
        <SwiperSlide
          key={index}
          className={clsx({
            "ml-4": index === 0,
            "md:ml-8": index === 0 && !isInitial,
          })}
        >
          <div className="rounded-lg">
            <ArchCard
              id={card.id}
              imageUrl={card.imageUrl}
              title={card.title}
              cityNames={card.cityNames}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ArchCardSlider;
