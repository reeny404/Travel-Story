import RatingIcons from "@/components/Card/RatingIcons";
import ImageFrame from "@/components/Frame/ImageFrame";
import { useBookmarks } from "@/hooks/useBookmark";
import Image from "next/image";
import Link from "next/link";
// area ItemsPage가 있어야 될듯????
type AreaCardType = {
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
}: AreaCardType) {
  const { isBookmarked, addBookmark, deleteBookmark } = useBookmarks(id);

  return (
    <div className="w-full h-full relative">
      <ImageFrame
        src={imageUrl}
        alt="detailCard"
        roundType="sm"
        className="h-[189px] w-full"
      />
      <div className="p-4">
        <Link href={linkUrl} className="text-xl font-bold mt-3 mb-3">
          {title}
        </Link>
        <p className="mb-3">{description}</p>
        {rating && <RatingIcons rating={rating} />}
      </div>
      <Image
        src={
          isBookmarked
            ? "/cardImages/bookmarked.png"
            : "/cardImages/bookmark.svg"
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
