import CardType from "@/components/Card/CardType";
import { getSliderProps } from "@/components/Slider/getSliderProp";
import { Area } from "@/types/Recommend";
import { FC, lazy, useMemo } from "react";
const CardSlider = lazy(() => import("@/components/Slider/CardSlider"));

type SliderSectionProps = {
  areas: Area[];
  linkUrl: string;
  title: string;
  type: string;
};

const SliderSection: FC<SliderSectionProps> = ({
  areas,
  linkUrl,
  title,
  type,
}) => {
  const sliderProps = useMemo(() => getSliderProps(areas), [areas]);

  return (
    <>
      <CardType linkUrl={linkUrl} title={title} type={type} />
      {sliderProps && (
        <CardSlider spacing={20} slidesPerView={1.2} cards={sliderProps} />
      )}
    </>
  );
};

export default SliderSection;
