import SingleRatingIcon from "@/components/Card/SingleRatingIcon";
import PrimaryTagList from "@/components/commons/TagList/PrimaryTagList";
import { getKrCategory } from "@/utils/getKrCategory";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CardImgFrame from "./CardImgFrame";
// TODO getKrCategory로 수정할 것
type SimilarAreaCardProps = {
  imageUrl: string;
  linkUrl: string;
  title: string;
  type: string;
  rating: number;
};

const MOCK_TAGS = ["친구와 함께", "식도락", "힐링", "도심"];

const SimilarAreaCard = React.memo(
  ({ title, imageUrl, linkUrl, type, rating }: SimilarAreaCardProps) => {
    return (
      <div className="relative w-full md:max-w-[300px] md rounded-lg pb-5">
        <Link href={linkUrl} className="w-full relative">
          <CardImgFrame
            imageUrl={imageUrl}
            alt={title}
            frameClassName="aspect-square md:aspect-square"
            imageClassName="object-cover rounded-lg"
          />
        </Link>
        <div className="w-full">
          <p className="font-semibold">{title}</p>
          <div className="flex w-full justify-between">
            <div className="flex items-center relative aspect-auto">
              <Image
                src={`/icons/${type}-color.svg`}
                alt={type}
                width={14}
                height={14}
                className="mr-2 object-contain"
              />
              <p className="text-xs leading-[22px]">{getKrCategory(type)}</p>
            </div>
            <SingleRatingIcon rating={rating} />
          </div>
          <div className="w-full pt-3 -ml-4">
            <PrimaryTagList tagList={MOCK_TAGS} />
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.rating === nextProps.rating
);

SimilarAreaCard.displayName = "SimilarAreaCard";

export default SimilarAreaCard;
