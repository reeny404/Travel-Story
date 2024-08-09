import { CategoryCardProps } from "@/types/Card";

export const getCategory = (category: string): CategoryCardProps["tag"] => {
  const categoryMap: { [key: string]: CategoryCardProps["tag"] } = {
    place: "관광",
    restaurant: "식당",
    accommodation: "숙소",
    shop: "쇼핑",
  };

  return categoryMap[category] || "관광";
};
