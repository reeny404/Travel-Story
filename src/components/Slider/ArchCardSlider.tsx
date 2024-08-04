import ArchCard from "@/app/(provider)/(root)/_components/ArchCard";
import { ArchSliderProps } from "@/types/Slider";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

// spacing: 카드 간 간격, slidesPerView: 한 화면에 보일 카드의 개수
function ArchCardSlider({ spacing, slidesPerView, cards }: ArchSliderProps) {
  return (
    <Swiper
      spaceBetween={spacing}
      slidesPerView={slidesPerView}
      grabCursor={true}
    >
      {cards.map((card, index) => (
        <SwiperSlide key={index} className={`${index === 0 ? "ml-4" : ""}`}>
          <div className="bg-white rounded-lg">
            <ArchCard imageUrl={card.imageUrl} title={card.title} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ArchCardSlider;
