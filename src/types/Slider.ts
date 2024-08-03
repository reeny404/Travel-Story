export type SlideCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  tags?: string[] | undefined;
  id: number;
  city: string;
  country: string;
  areaName: string;
};

export type SliderProps = {
  spacing: number;
  slidesPerView?: number;
  cards: SlideCardProps[];
};

export type TagSliderProps = Pick<SliderProps, "spacing">;
