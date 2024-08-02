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
    <div className="w-full flex justify-center p-5 pt-4">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Image
          key={`filled-${idx}`}
          src={
            rating <= idx
              ? `/icons/${ICON.star.unfill}.png`
              : `/icons/${ICON.star.fill}.png`
          }
          alt="filled star"
          width={30}
          height={30}
          onClick={() => handleRatingClick(rating, idx + 1)}
          className={"object-contain mr-1 cursor-pointer"}
        />
      ))}
    </div>
  );
}

export default ReviewBottomSheetRating;
