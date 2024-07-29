import CardType from "@/components/Card/CardType";
import RatingIcons from "@/components/Card/RatingIcons";
import ImageFrame from "@/components/Frame/ImageFrame";
import Link from "next/link";

type ReviewCardProps = {
  title: string;
  description: string;
  rating: number;
  imageUrl: string | null;
  linkUrl: string;
};

function ReviewCard({
  title,
  description,
  rating,
  imageUrl,
  linkUrl,
}: ReviewCardProps) {
  return (
    <>
      <CardType title="최고의 후기" type="thumsup" innerClassName="mt-5" />
      <div className="flex w-full items-center h-[106px] mt-5 ">
        <ImageFrame
          src={imageUrl}
          alt="detailCard"
          roundType="sm"
          className="h-full w-[120px]"
        />
        <div className="ml-4">
          <Link href={linkUrl} className="text-xl font-bold mt-2 mb-2">
            {title}
          </Link>
          <p className="text-sm overflow-x-hidden whitespace-nowrap text-ellipsis mb-2">
            {description}
          </p>
          <RatingIcons rating={rating} />
        </div>
      </div>
    </>
  );
}

export default ReviewCard;
