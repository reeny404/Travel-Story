"use client";

import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ReactNode } from "react";

type CarouselProps = {
  slides: ReactNode[] | string[];
  options?: EmblaOptionsType;
};

function Carousel({ slides, options }: CarouselProps) {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay({ delay: 3000 })]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container flex">{slides}</div>
    </div>
  );
}

export default Carousel;
