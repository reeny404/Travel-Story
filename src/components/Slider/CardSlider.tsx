"use client";
import AreaCard from "@/app/(provider)/(root)/recommend/_components/Cards/AreaCard";
import { useBookmarks } from "@/hooks/useBookmark";
import { SliderProps } from "@/types/Slider";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

// spacing: 카드 간 간격, slidesPerView: 한 화면에 보일 카드의 개수
function CardSlider({ spacing, slidesPerView, cards }: SliderProps) {
  const { isBookmarked, addBookmark, deleteBookmark } = useBookmarks();
  return (
    <Swiper
      spaceBetween={spacing}
      slidesPerView={slidesPerView}
      grabCursor={true}
    >
      {cards.map((card, index) => (
        <SwiperSlide
          key={index}
          className={`md:max-w-[303px] md:pb-3 ${index === 0 ? "ml-4 md:ml-8" : ""}`}
        >
          <div className="bg-white rounded-lg shadow-area-card ">
            <AreaCard
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              linkUrl={card.linkUrl}
              id={card.id}
              city={card.city}
              country={card.country}
              areaName={card.areaName}
              rating={card.rating}
              isBookmarked={isBookmarked(card.id)}
              addBookmark={() => addBookmark.mutate(card.id)}
              deleteBookmark={() => deleteBookmark.mutate(card.id)}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CardSlider;
