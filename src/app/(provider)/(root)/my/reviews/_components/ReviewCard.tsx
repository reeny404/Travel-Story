import Icon from "@/components/commons/Icon";
import ImageFrame from "@/components/Frame/ImageFrame";
import { ICON } from "@/constants/icon";
import { AreaReview } from "@/types/Recommend";

type ReviewCardProps = {
  review: AreaReview;
};

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div
      key={review.id}
      className="rounded mx-4 p-4 bg-white shadow-bookmark-card"
    >
      <div className="flex items-center mb-3">
        <h2 className="font-bold">{review.areaName}</h2>
      </div>
      <div className="flex h-full">
        <div className="w-1/4 h-24 mr-3 rounded-xl overflow-hidden">
          {review.imageUrls[0] == "" ? (
            <ImageFrame
              src={review.imageUrls[0]}
              className="w-full h-full bg-slate-200 "
            />
          ) : (
            <div className="w-full h-full bg-slate-200"></div>
          )}
        </div>
        <div className="w-3/4">
          <p className="text-sm line-clamp-2">{review.content}</p>
          <div className="flex items-center">
            <Icon icon={ICON.star.fill} alt="arrow" size={16} />
            <span className="text-sm">{review.rating}</span>
          </div>
          <div className="flex justify-end text-sm">{/* 버튼자리 */}</div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
