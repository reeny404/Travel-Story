import { getIconPath } from "@/components/commons/Icon/getIconPath";
import PrimaryTagList from "@/components/commons/TagList/PrimaryTagList";
import { ICON } from "@/constants/icon";
import Image from "next/image";
import Link from "next/link";
import { convertTypeToKr } from "../AreaPage/_utils/convertTypeToKr";
import CardImgFrame from "./CardImgFrame";

type SimilarAreaCard = {
  imageUrl: string;
  linkUrl: string;
  title: string;
  type: string;
  rating: number;
};
const MOCK_TAGS = ["친구와 함께", "식도락", "힐링", "도심"];

function SimilarAreaCard({
  title,
  imageUrl,
  linkUrl,
  type,
  rating,
}: SimilarAreaCard) {
  return (
    <div className="relative w-full rounded-lg pb-5">
      <Link href={linkUrl} className="w-full relative">
        <CardImgFrame
          imageUrl={imageUrl}
          alt={title}
          frameClassName="aspect-square"
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
            <p className="text-xs leading-[22px]">{convertTypeToKr(type)}</p>
          </div>
          <div className="flex gap-x-1 items-center relative aspect-square">
            <Image
              alt="rating"
              src={getIconPath(ICON.star.fill)}
              width={12}
              height={12}
              className="object-fill"
            />
            <p className="text-xs text-neutral-500">{rating}</p>
          </div>
        </div>
        <div className="w-full pt-3 -ml-4">
          <PrimaryTagList tagList={MOCK_TAGS} />
        </div>
      </div>
    </div>
  );
}

export default SimilarAreaCard;
