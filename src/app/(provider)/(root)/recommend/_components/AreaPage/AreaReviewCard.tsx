import RatingIcons from "@/components/Card/RatingIcons";
import VanilaImgFrame from "../VanilaImgFram";

// props로 유저정보, 리뷰정보를 받아야함.
type AreaReviewCardProps = {
  name: string;
  createdAt: string;
  userImageUrl: string | null;
  imageUrl: string;
  rating: number;
  description: string;
};

function AreaReviewCard({
  name,
  createdAt,
  userImageUrl,
  imageUrl,
  rating = 0,
  description,
}: AreaReviewCardProps) {
  const date = createdAt.slice(0, 10).replaceAll("-", ".");
  return (
    <section className="w-full flex flex-col px-4">
      <article className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <VanilaImgFrame
            imageUrl={userImageUrl || "/icons/avatar-black.png"}
            alt="icon"
            width="w-11"
            height="h-11"
            frameClassName="bg-white rounded-full relative aspect-auto"
            imageClassName="rounded-full object-contain"
          />

          <div className="flex flex-col justify-center gap-y-1 pl-4 relation">
            <h1 className="text-sm font-bold">{name}</h1>
            <p className="text-xs font-semibold">{date}</p>
          </div>
        </div>
        <VanilaImgFrame
          imageUrl={"/icons/bars-black.svg"}
          alt="icon"
          width="w-5"
          height="h-5"
          frameClassName="bg-white rounded-full relative aspect-auto"
          imageClassName="object-contain"
        />
      </article>
      <div className="mt-7">
        <RatingIcons type="small" rating={rating} />
      </div>
      <p className="w-full mt-3 text-xs text-ellipsis line-clamp-3 ">
        {description}
      </p>
      {imageUrl && (
        <VanilaImgFrame
          imageUrl={imageUrl}
          alt="reviewImg"
          width="w-full"
          height="h-[220px]"
          frameClassName="relative aspect-auto mt-3 mb-12 hover:cursor-pointer"
          imageClassName="object-cover"
        />
      )}
    </section>
  );
}

export default AreaReviewCard;
