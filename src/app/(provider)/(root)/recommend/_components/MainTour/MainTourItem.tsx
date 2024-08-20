import RatingIcons from "@/components/Card/RatingIcons";
import { Area, City } from "@/types/Recommend";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type MainTourItemProps = {
  item: Area & City;
  itemType: string;
};

const MainTourItem = React.memo(({ item, itemType }: MainTourItemProps) => {
  const linkUrl = itemType === "city" ? "/recommend/city/" : "/recommend/area/";

  return (
    <section className="flex w-full items-center pb-6 pl-4 md:pl-8 gap-x-3 md:w-[466px]">
      <div className="min-w-20 min-h-20 relative aspect-square">
        <Image
          src={
            !item.imageUrl || item.imageUrl === ""
              ? "/defaultImage.webp"
              : item.imageUrl
          }
          alt="recomendPlace"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col">
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
});

MainTourItem.displayName = "MainTourItem";

export default MainTourItem;
