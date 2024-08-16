import { City } from "./Recommend";

export type SlideCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  tags: string[] | undefined;
  id: number;
  city: string;
  country: string;
  areaName: string;
  rating?: number;
};

export type SliderProps = {
  spacing: number;
  slidesPerView?: number;
  cards: SlideCardProps[];
};

export type TagSliderProps = Pick<SliderProps, "spacing">;

export type ArchSliderProps = {
  spacing: number;
  slidesPerView: number;
  cards?: {
    imageUrl: string;
    title: string;
  }[];
};

export type SmImageSliderProps = {
  spacing: number;
  slidesPerView: number;
  cards: City[];
};
