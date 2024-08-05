import ArchCard from "@/app/(provider)/(root)/_components/ArchCard";
import { ArchSliderProps } from "@/types/Slider";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const popularDestinations = [
  {
    id: 1,
    imageUrl: "/country/france.jpg",
    title: "France",
    cityNames: "파리 · 마르세유 · 릴 · 보르도",
  },
  {
    id: 2,
    imageUrl: "/country/japan.jpg",
    title: "Japan",
    cityNames: "도쿄 · 후쿠오카 · 교토 · 오사카",
  },
  {
    id: 4,
    imageUrl: "/country/italy.jpg",
    title: "Italy",
    cityNames: "바티칸 · 나폴리 · 피렌체 · 로마",
  },
  {
    id: 5,
    imageUrl: "/country/spain.jpg",
    title: "Spain",
    cityNames: "마드리드 · 세비야 · 바르셀로나",
  },
  {
    id: 7,
    imageUrl: "/country/australia.jpg",
    title: "Australia",
    cityNames: "시드니 · 멜버른 · 브리즈번",
  },
];
// spacing: 카드 간 간격, slidesPerView: 한 화면에 보일 카드의 개수
function ArchCardSlider({ spacing, slidesPerView, cards }: ArchSliderProps) {
  return (
    <Swiper
      spaceBetween={spacing}
      slidesPerView={slidesPerView}
      grabCursor={true}
    >
      {popularDestinations.map((card, index) => (
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
