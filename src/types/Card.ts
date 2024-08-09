export type CategoryCardProps = {
  tag: "관광" | "숙소" | "식당" | "쇼핑";
};

export type AreaTagCardProps = {
  image: string;
  alt: string;
  title: string;
  rating: number | string;
  desc: string;
  onClick?: () => void;
} & CategoryCardProps;
