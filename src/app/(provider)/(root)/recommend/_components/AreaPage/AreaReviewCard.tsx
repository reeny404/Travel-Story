import RatingIcons from "@/components/Card/RatingIcons";
import Image from "next/image";

// props로 유저정보, 리뷰정보를 받아야함.
type AreaReviewCardProps = {
  name: string;
  createdAt: string;
  userIageUrl: string;
  imageUrl: string;
  rating: number;
  description: string;
};

function AreaReviewCard({
  name,
  createdAt,
  userIageUrl,
  imageUrl,
  rating,
  description,
}: AreaReviewCardProps) {
  const date = createdAt.slice(0, 10).replaceAll("-", ".");

  return (
    <div className="w-full p-3 flex flex-col gap-y-3">
      <div className="flex justify-around w-full">
        <div className="w-16 h-16 bg-white opacity-70 rounded-full relative aspect-auto">
          <Image
            src={
              "https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/areas/EiffelTower.jpg"
            }
            alt="image"
            sizes="width"
            fill
            className="rounded-full object-cover w-auto h-auto"
          />
        </div>
        <div className="flex flex-col justify-center gap-y-1 w-2/3 ml-5 relation">
          <h1 className="text-sm font-bold">{name}</h1>
          <p className="text-xs font-semibold">{date}</p>
        </div>
      </div>
      <div className="mt-3">
        <RatingIcons rating={rating} />
      </div>
      <div className="w-full text-xs text-ellipsis line-clamp-3">
        {description}
      </div>
      <div className="w-full h-[150px] relative aspect-auto">
        <Image
          src="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/areas/EiffelTower.jpg"
          alt="image"
          fill
          className="object-fill"
        />
      </div>
    </div>
  );
}

export default AreaReviewCard;
