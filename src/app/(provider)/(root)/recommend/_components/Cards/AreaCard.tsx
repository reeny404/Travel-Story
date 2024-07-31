import RatingIcons from "@/components/Card/RatingIcons";
import ImageFrame from "@/components/Frame/ImageFrame";
import Link from "next/link";
// area ItemsPage가 있어야 될듯????
type AreaCardType = {
  title: string;
  description: string;
  rating?: number;
  imageUrl: string | null;
  linkUrl: string;
};

function AreaCard({
  title,
  description,
  rating,
  imageUrl,
  linkUrl,
}: AreaCardType) {
  return (
    <>
      <ImageFrame
        src={imageUrl}
        alt="detailCard"
        roundType="sm"
        className="h-[189px]"
      />
      <div className="p-4">
        <Link href={linkUrl} className="font-bold mt-3 mb-3">
          {title}
        </Link>
        <p className="text-sm mb-3">{description}</p>
        {rating && <RatingIcons rating={rating} />}
      </div>
    </>
  );
}

export default AreaCard;
