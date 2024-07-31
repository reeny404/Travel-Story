export type SlideCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  tags?: string[] | undefined;
};

export type SliderProps = {
  spacing: number;
  slidesPerView?: number;
  cards: SlideCardProps[];
};

export type TagSliderProps = Pick<SliderProps, "spacing">;
