import { ICON } from "@/constants/icon";
import Image from "next/image";

type ReviewBottomSheetRating = {
  rating: number;
  handleRatingClick: (rating: number, idx: number) => void;
};

function ReviewBottomSheetRating({
  rating,
  handleRatingClick,
}: ReviewBottomSheetRating) {
  return (
    <div className="w-full h-10 flex justify-center gap-x-3 aspect-square">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Image
          key={`filled-${idx}`}
          src={
            rating <= idx
              ? `/icons/${ICON.star.unfill}.svg`
              : `/icons/${ICON.star.fill}.svg`
          }
          alt="filled star"
          width={36}
          height={36}
          onClick={() => handleRatingClick(rating, idx + 1)}
          className={"object-fill cursor-pointer"}
        />
      ))}
    </div>
  );
}

export default ReviewBottomSheetRating;
