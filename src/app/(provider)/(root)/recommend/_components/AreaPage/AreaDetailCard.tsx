import RatingIcons from "@/components/Card/RatingIcons";
import PrimaryTagList from "@/components/commons/TagList/PrimaryTagList";
import { Area } from "@/types/Recommend";
import { getKrCategory } from "@/utils/getKrCategory";
import Image from "next/image";
import React, { MutableRefObject } from "react";

type AreaDetailCardProps = {
  area: Area;
  ratingAmount: number;
  reviewSectionRef: MutableRefObject<HTMLDivElement | null>;
};

const AreaDetailCard = React.memo(
  ({ area, ratingAmount, reviewSectionRef }: AreaDetailCardProps) => {
    const handleClickRating = () => {
      if (reviewSectionRef.current) {
        reviewSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    return (
      <section className="w-full flex items-center md:max-h-[283px] pt-8 md:pt-10 pb-[52px] px-4 shadow-default rounded-lg">
        <article className="w-full md:hidden">
          <div className="flex justify-between items-center font-semibold">
            <div className="flex relative aspect-auto">
              <Image
                src={`/icons/${area.type}-color.svg`}
                alt={area.type!}
                width={20}
                height={10}
                className="mr-2 object-contain"
              />
              <p>{getKrCategory(area.type!)}</p>
            </div>
            <div
              onClick={handleClickRating}
              className="flex items-center gap-x-1 cursor-pointer"
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
        <article className="hidden md:flex w-full">
          <div className="w-1/2 pr-[72px] border-r">
            <div className="flex justify-between items-center font-semibold">
              <div className="flex relative aspect-auto">
                <Image
                  src={`/icons/${area.type}-color.svg`}
                  alt={area.type!}
                  width={20}
                  height={10}
                  className="mr-2 object-contain"
                />
                <p>{getKrCategory(area.type!)}</p>
              </div>
              <div
                onClick={handleClickRating}
                className="flex items-center gap-x-1 cursor-pointer"
              >
                <RatingIcons type="big" rating={area.rating!} />
                <span className="text-xs text-[#949494]">{`(${ratingAmount})`}</span>
              </div>
            </div>
            <p className="pt-2 flex justify-between items-center font-semibold">
              <span className="text-[#9DB408]">영업중</span>
              <span className="font-normal">
                {area.info.opening_hours?.open} -{" "}
                {area.info.opening_hours?.close}
              </span>
            </p>
            <div className="-ml-2 pt-8">
              <PrimaryTagList tagList={area.tags} />
            </div>
          </div>
          <p className="w-1/2 pl-[72px] font-semibold">{area.description}</p>
        </article>
      </section>
    );
  }
);

AreaDetailCard.displayName = "AreaDetailCard";

export default AreaDetailCard;
