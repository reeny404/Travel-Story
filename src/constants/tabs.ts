export type TabType = { kr: string; en: string; isEnabled?: boolean };

export const TABS: { default: TabType[]; areaDetail: TabType[] } = {
  default: [
    { kr: "관광", en: "place", isEnabled: true },
    { kr: "숙소", en: "accommodation", isEnabled: true },
    { kr: "식당", en: "restaurant", isEnabled: true },
    { kr: "쇼핑", en: "shop", isEnabled: true },
  ],
  areaDetail: [
    { kr: "이용안내", en: "notice", isEnabled: true },
    { kr: "위치", en: "location", isEnabled: true },
    { kr: "리뷰", en: "review", isEnabled: true },
    { kr: "추천장소", en: "relatedArea", isEnabled: true },
  ],
};
