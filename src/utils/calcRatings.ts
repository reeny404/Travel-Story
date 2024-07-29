import { Rating } from "@/types/Recommend";

export const calcRatings = ({ rating, pieces }: Rating): Rating => {
  console.log("rating,pieces", rating, pieces);
  if (!rating) {
    return { rating: 0, pieces: 0 };
  }
  return { rating: Math.round(rating / pieces), pieces };
};
