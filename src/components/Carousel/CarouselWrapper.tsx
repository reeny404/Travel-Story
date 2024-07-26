import { EmblaOptionsType } from "embla-carousel";
import { ReactNode } from "react";
import Carousel from "./Carousel";
type CarouselItem = { items: ReactNode[] | string[] };

// 이곳에 JSX로 이루어진 데이터 베열을 넣는다면 이를 케러셀로 리턴해줍니다.

const CarouselWrapper = ({ items }: CarouselItem) => {
  const OPTIONS: EmblaOptionsType = { align: "center", loop: true };

  return (
    <section>
      <Carousel slides={items} options={OPTIONS} />
    </section>
  );
};

export default CarouselWrapper;
