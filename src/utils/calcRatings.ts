export const calcRatings = (rating: number, pieces: number) => {
  return Math.round(rating / pieces);
};
