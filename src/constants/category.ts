export const CATEGORY_LIST = {
  관광: {
    icon: "/category/place.svg",
    color: "text-sucess-700",
    label: "관광",
  },
  식당: {
    icon: "/category/restaurant.svg",
    color: "text-danger-400",
    label: "식당",
  },
  숙소: {
    icon: "/category/accommodation.svg",
    color: "text-info-500",
    label: "숙소",
  },
  쇼핑: {
    icon: "/category/shop.svg",
    color: "text-purple-400",
    label: "쇼핑",
  },
};

export const HOMECARD_CATEGORY: Record<string, HomeCardCategoryType> = {
  관광지: {
    title: "Tourist spot",
    subTitle: "그 나라만의 특별한 여행지",
    textTheme: "md:text-lime-700",
    cardBackgroundColor: "bg-lime-300",
    moreDesc: "더 많은 관광지 보러가기",
    moreDescTextColor: "text-brand-200",
    moreDescIconColor: "brand-200",
  },
  숙소: {
    title: "Hotel",
    subTitle: "관광지 근처의 숙소를 구경해보세요.",
    textTheme: "md:text-info-500",
    cardBackgroundColor: "bg-info-500",
    moreDesc: "더 많은 숙소 보러가기",
    moreDescTextColor: "text-info-700",
    moreDescIconColor: "info-700",
  },
  식당: {
    title: "Restaurant",
    subTitle: "여행지에는 어떤 맛집이 있을까?",
    textTheme: "md:text-danger-400",
    cardBackgroundColor: "md:bg-danger-400",
    moreDesc: "더 많은 식당 보러가기",
    moreDescTextColor: "text-danger-600",
    moreDescIconColor: "danger-600",
  },
  쇼핑: {
    title: "Shopping",
    subTitle: "여행지의 추억을 간직하세요.",
    textTheme: "md:text-[#A25FFF]",
    cardBackgroundColor: "bg-purple-400",
    moreDesc: "더 많은 쇼핑센터 보러가기",
    moreDescTextColor: "text-purple-600",
    moreDescIconColor: "purple-600",
  },
};
