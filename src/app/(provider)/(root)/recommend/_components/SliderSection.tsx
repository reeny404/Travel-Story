import CardType from "@/components/Card/CardType";
import CardSlider from "@/components/Slider/CardSlider";
import { getSliderProps } from "@/components/Slider/getSliderProp";
import { Area } from "@/types/Recommend";
import { FC, useMemo } from "react";

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
