import { Area } from "@/types/Recommend";

export const getSliderProps = (slides: Area[]) => {
  return slides?.map((slide) => {
    return {
      title: slide.title,
      description: slide.description,
      imageUrl: slide.imageUrl!,
      linkUrl: `/recommend/area/${slide.id}`,
      tags: ["친구와 함께", "문화체험", "도심"],
      id: slide.id,
      city: slide.info.location[1],
      country: slide.info.location[0],
      areaName: slide.krName!,
      rating: slide.rating!,
    };
  });
};
