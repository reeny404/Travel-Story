import CityImage from "@/app/(provider)/(root)/recommend/_components/CountryPage/CityImage";
import { SmImageSliderProps } from "@/types/Slider";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

// spacing: 카드 간 간격, slidesPerView: 한 화면에 보일 카드의 개수
function ImageSlider({ spacing, slidesPerView, cards }: SmImageSliderProps) {
  return (
    <Swiper
      spaceBetween={spacing}
      slidesPerView={slidesPerView}
      grabCursor={true}
    >
      {cards &&
        cards?.map((card, index) => (
          <SwiperSlide
            key={index}
            className={`${index === 0 ? "ml-4" : ""} w-full max-w-[72px] md:max-w-[245px] mr-2 md:mr-6`}
          >
            <CityImage
              id={card.id}
              imageUrl={
                !card.imageUrl || card.imageUrl === ""
                  ? "/defaultImage.webp"
                  : card.imageUrl
              }
              name={card.krName!}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default ImageSlider;
