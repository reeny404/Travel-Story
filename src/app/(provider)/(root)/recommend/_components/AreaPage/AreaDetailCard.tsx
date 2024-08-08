"use client";

import RatingIcons from "@/components/Card/RatingIcons";
import { Area } from "@/types/Recommend";
import Image from "next/image";
import { MutableRefObject, useCallback } from "react";

type AreaDetailCardProps = {
  area: Area;
  ratingAmount: number;
  reviewSectionRef: MutableRefObject<HTMLDivElement | null>;
};
function AreaDetailCard({
  area,
  ratingAmount,
  reviewSectionRef,
}: AreaDetailCardProps) {
  const convertTypeToKr = useCallback((type: string) => {
    if (type === "restaurant") {
      return "식당";
    }
    if (type === "place") {
      return "관광지";
    }
    if (type === "accommodation") {
      return "숙소";
    }
    return "쇼핑";
  }, []);

  const handleClickRating = () => {
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <section className="w-full pt-8 pb-[52px] px-4 shadow-area-section rounded-lg">
      <article className="w-full ">
        <div className="flex justify-between items-center font-semibold">
          <div className="flex relative aspect-auto">
            <Image
              src={`/icons/${area.type}-color.svg`}
              alt={area.type!}
              width={20}
              height={10}
              className="mr-2 object-contain"
            />
            <p>{convertTypeToKr(area.type!)}</p>
          </div>
          <div
            onClick={handleClickRating}
            className="flex items-center gap-x-1"
          >
            <RatingIcons type="big" rating={area.rating!} />
            <span className="text-xs text-[#949494]">{`(${ratingAmount})`}</span>
          </div>
        </div>
        <p className="pt-2 flex justify-between items-center font-semibold">
          <span className="text-[#9DB408]">영업중</span>
          <span className="font-normal">
            {area.info.opening_hours?.open} - {area.info.opening_hours?.close}
          </span>
        </p>
        <p className="pt-10 font-semibold">{area.description}</p>
      </article>
    </section>
  );
}

export default AreaDetailCard;
