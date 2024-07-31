export type SlideCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
};

export type SliderProps = {
  spacing: number;
  slidesPerView: number;
  cards: SlideCardProps[];
};
