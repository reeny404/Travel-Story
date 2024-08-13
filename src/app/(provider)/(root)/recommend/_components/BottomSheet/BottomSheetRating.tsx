import { getIconPath } from "@/components/commons/Icon/getIconPath";
import { ICON } from "@/constants/icon";
import Image from "next/image";

type BottomSheetRatingProps = {
  rating: number;
  handleRatingClick: (rating: number, idx: number) => void;
};

function BottomSheetRating({
  rating,
  handleRatingClick,
}: BottomSheetRatingProps) {
  return (
    <div className="w-full h-10 flex justify-center gap-x-3 aspect-square">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Image
          key={`filled-${idx}`}
          src={
            rating <= idx
              ? getIconPath(ICON.star.unfill)
              : getIconPath(ICON.star.fill)
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

export default BottomSheetRating;
