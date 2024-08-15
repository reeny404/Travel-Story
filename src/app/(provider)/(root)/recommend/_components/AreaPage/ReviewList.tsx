import { AreaReview } from "@/types/Recommend";
import AreaReviewCard from "./AreaReviewCard"; // AreaReviewCard 경로를 실제 위치로 변경해야 합니다.

type ReviewListProps = {
  reviews: AreaReview[];
};

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <>
      {reviews &&
        reviews.map((review, idx) => {
          return (
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
          );
        })}
    </>
  );
};

export default ReviewList;
