import { CategoryProps } from "@/types/Card";

export const getKrCategory = (category: string): CategoryProps["tag"] => {
  const categoryMap: { [key: string]: CategoryProps["tag"] } = {
    place: "관광",
    restaurant: "식당",
    accommodation: "숙소",
    shop: "쇼핑",
  };

  return categoryMap[category] || "관광";
};
