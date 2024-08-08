import { ICON } from "@/constants/icon";
import Image from "next/image";
import { getIconPath } from "../commons/Icon/getIconPath";

function SingleRatingIcon({ rating }: { rating: number }) {
  return (
    <div className="flex gap-x-1 items-center relative aspect-square">
      <Image
        alt="rating"
        src={getIconPath(ICON.star.fill)}
        width={12}
        height={12}
        className="object-fill"
      />
      <p className="text-xs text-neutral-500">{rating}</p>
    </div>
  );
}

export default SingleRatingIcon;
