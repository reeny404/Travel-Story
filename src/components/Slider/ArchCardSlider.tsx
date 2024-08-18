import ArchCard from "@/app/(provider)/(root)/_components/ArchCard";
import { useWindowSize } from "@/app/(provider)/(root)/_hook/useWindowSize";
import { POPULAR_DESTINATIONS } from "@/constants/popular";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

function ArchCardSlider() {
  const [spaceBetween, setSpaceBetween] = useState(12);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (!windowSize.width) return;

    if (windowSize.width >= 1380) {
      setSpaceBetween(28);
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
      spaceBetween={12}
      slidesPerView={3.8}
      grabCursor={true}
      breakpoints={{
        431: {
          slidesPerView: 3,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 12,
        },
        1280: {
          slidesPerView: 8,
          spaceBetween: 30,
        },
      }}
    >
      {POPULAR_DESTINATIONS.map((card, index) => (
        <SwiperSlide
          key={index}
          className={`${index === 0 ? "ml-4 md:ml-8" : ""}`}
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
