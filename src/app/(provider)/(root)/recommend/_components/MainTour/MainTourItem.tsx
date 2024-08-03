import RatingIcons from "@/components/Card/RatingIcons";
import { Area, City } from "@/types/Recommend";
import Image from "next/image";
import Link from "next/link";

type MainTourItemProps = {
  item: Area & City;
  itemType: string;
};

function MainTourItem({ item, itemType }: MainTourItemProps) {
  const linkUrl = itemType === "city" ? "/recommend/city/" : "/recommend/area/";
  return (
    <section className="flex w-full items-center gap-x-3 pb-6">
      <div className="w-20 h-20 relative aspect-square">
        <Image
          src={item.imageUrl!}
          alt="recomendPlace"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col w-3/4">
        <Link
          href={`${linkUrl}${item.id}`}
          className="text-[15px] font-bold text-ellipsis overflow-x-hidden whitespace-nowrap line-clamp-1"
        >
          {item.krName}
        </Link>
        <p className="text-sm mb-2 text-ellipsis line-clamp-2">
          {item.description}
        </p>
        <RatingIcons rating={item.rating!} type="small" />
      </div>
    </section>
  );
}

export default MainTourItem;
