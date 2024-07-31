import { Rating } from "@/types/Recommend";

export const calcRatings = ({ rating, pieces }: Rating): Rating => {
  if (!rating) {
    return { rating: 0, pieces: 0 };
  }
  return { rating: Math.round(rating / pieces), pieces };
};
