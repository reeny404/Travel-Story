import RatingIcons from "@/components/Card/RatingIcons";
import ImageFrame from "@/components/Frame/ImageFrame";
import { AreaReview } from "@/types/Recommend";
import Link from "next/link";

type ReviewCardProps = {
  review: AreaReview;
  onDelete: () => void;
};

function ReviewCard({ review, onDelete }: ReviewCardProps) {
  return (
    <div
      key={review.id}
      className="rounded mx-4 p-4 bg-white shadow-bookmark-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{review.areaName}</h3>
        <button
          className="px-4 py-1 bg-neutral-150 font-neutral-750 rounded-xl"
          onClick={onDelete}
        >
          삭제
        </button>
      </div>
      <RatingIcons rating={review.rating} type="small" />
      <p className="text-sm line-clamp-3 mt-3">{review.content}</p>
      <div className="w-full h-40 mt-4 mb-5 rounded-xl overflow-hidden">
        {review.imageUrls[0] && (
          <ImageFrame
            src={review.imageUrls[0]}
            className="w-full h-full bg-slate-200"
          />
        )}
      </div>
      <Link
        href={`/recommend/area/` + review.areaId}
        className="w-full h-10 flex items-center justify-center rounded-lg border border-black mt-2"
      >
        장소 보러가기
      </Link>
    </div>
  );
}

export default ReviewCard;
