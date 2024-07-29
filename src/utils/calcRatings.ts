import { Rating } from "@/types/Recommend";

export const calcRatings = ({ rating, pieces }: Rating): number | undefined => {
  if (!rating || !pieces) {
    return 0;
  }
  return Math.round(rating / pieces);
};
