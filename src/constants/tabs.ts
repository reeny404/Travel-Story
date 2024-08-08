export type Tab = { kr: string; en: string };

export const TABS: { default: Tab[], areaDetail: Tab[] } = {
  default: [
    { kr: "관광", en: "place" },
    { kr: "숙소", en: "accommodation" },
    { kr: "식당", en: "restaurant" },
    { kr: "쇼핑", en: "shop" },
  ],
  areaDetail: [
    { kr: "이용안내", en: "notice" },
    { kr: "위치", en: "location" },
    { kr: "리뷰", en: "review" },
    { kr: "추천장소", en: "relatedArea" },
  ],
};
