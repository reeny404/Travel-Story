import ArchCard from "@/app/(provider)/(root)/_components/ArchCard";
import { POPULAR_DESTINATIONS } from "@/constants/popular";
import { ArchSliderProps } from "@/types/Slider";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

// spacing: 카드 간 간격, slidesPerView: 한 화면에 보일 카드의 개수
function ArchCardSlider({ spacing, slidesPerView, cards }: ArchSliderProps) {
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
        <SwiperSlide key={index} className={`${index === 0 ? "ml-4" : ""}`}>
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
