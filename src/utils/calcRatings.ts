import { Rating } from "@/types/Recommend";

export const calcRatings = ({ rating, pieces }: Rating): number | undefined => {
  if (!rating || !pieces) {
    return;
  }
  return Math.round(rating / pieces);
};
