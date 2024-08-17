import { AreaReview } from "@/types/Recommend";
import AreaReviewCard from "./AreaReviewCard";

type ReviewListProps = {
  reviews: AreaReview[];
  width: number;
};

const ReviewList = ({ reviews, width }: ReviewListProps) => {
  let maxReviewsToShow = 1;

  if (width >= 1280) {
    maxReviewsToShow = 3;
  } else if (width >= 1024) {
    maxReviewsToShow = 2;
  } else if (width >= 768) {
    maxReviewsToShow = 1;
  }

  return (
    <>
      {reviews &&
        reviews
          .slice(0, maxReviewsToShow)
          .map((review) => (
            <AreaReviewCard
              key={review.id}
              userImageUrl={review.profileImg}
              name={review.nickname}
              imageUrl={review.imageUrls[0]}
              createdAt={review.createdAt}
              rating={review.rating}
              description={review.content!}
              reviewInfo={review}
            />
          ))}
    </>
  );
};

export default ReviewList;
