import RatingIcons from "@/components/Card/RatingIcons";
import ImageFrame from "@/components/Frame/ImageFrame";
import { ICON } from "@/constants/icon";
import { useBookmarks } from "@/hooks/useBookmark";
import Image from "next/image";
import Link from "next/link";
// area ItemsPage가 있어야 될듯????
export type AreaCardProps = {
  title: string;
  description: string;
  rating?: number;
  imageUrl: string | null;
  linkUrl: string;
  id: number;
};

function AreaCard({
  title,
  description,
  rating,
  imageUrl,
  linkUrl,
  id,
}: AreaCardProps) {
  const { isBookmarked, addBookmark, deleteBookmark } = useBookmarks(id);
  return (
    <div className="w-full h-full relative">
      <ImageFrame
        src={imageUrl}
        roundType="sm"
        className="w-[301px] h-[138px]"
      />
      <div className="px-4 py-3">
        <Link href={linkUrl} className="font-bold mt-3 mb-3">
          {title}
        </Link>
        <p className="mb-3">{description}</p>
        <RatingIcons type="small" rating={rating || 0} />
      </div>
      <Image
        src={
          isBookmarked
            ? `/icons/${ICON.bookmark.on.name}.svg`
            : `/icons/${ICON.bookmark.off.name}.svg`
        }
        alt="bookmark"
        width={10}
        height={10}
        className="h-5 w-5 z-10 absolute top-2 right-3 hover:cursor-pointer"
        onClick={() =>
          isBookmarked ? deleteBookmark.mutate() : addBookmark.mutate()
        }
      />
    </div>
  );
}

export default AreaCard;
