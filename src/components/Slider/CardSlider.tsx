import CarouselItem from "@/app/(provider)/(root)/recommend/_components/Carousel/CarouselItem";
import { SliderProps } from "@/types/Slider";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

function CardSlider({ spacing, slidesPerView, cards }: SliderProps) {
  return (
    <Swiper
      spaceBetween={spacing}
      slidesPerView={slidesPerView}
      grabCursor={true}
    >
      {cards.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="bg-white rounded-lg overflow-hidden">
            <CarouselItem
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              linkUrl={item.linkUrl}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CardSlider;
