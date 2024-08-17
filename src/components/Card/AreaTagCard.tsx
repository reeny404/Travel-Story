import { getIconPath } from "@/components/commons/Icon/getIconPath";
import { CATEGORY_LIST } from "@/constants/category";
import { ICON } from "@/constants/icon";
import { AreaTagCardProps, CategoryProps } from "@/types/Card";
import Image from "next/image";

export function Category({ tag }: CategoryProps) {
  const { icon, color, label } = CATEGORY_LIST[tag];

  return (
    <div className="flex justify-center items-center">
      <Image src={icon} alt={label} width={16} height={16} />
      <h4 className={`text-sm font-medium ml-1 ${color}`}>{label}</h4>
    </div>
  );
}

function AreaTagCard(props: AreaTagCardProps) {
  const { image, alt, title, tag, rating, desc, onClick } = props;

  return (
    <div
      className="flex items-center w-full py-3 cursor-pointer sm:flex-col"
      onClick={onClick}
    >
      <div className="relative flex-none w-[84px] h-[84px] mr-3 bg-neutral-200 rounded-lg overflow-hidden aspect-square sm:max-w-[300px] sm:w-full sm:max-h-[300px] sm:h-full sm:mr-0">
        <Image src={image} alt={alt} fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-center items-start text-sm sm:max-w-[300px] sm:w-full sm:max-h-[300px] sm:h-full sm:justify-start sm:mt-3 sm:pb-5">
        <h2 className="text-base font-semibold text-ellipsis line-clamp-1 mb-1">
          {title}
        </h2>
        <div className="flex flex-1 justify-between w-full">
          <Category tag={tag} />
          <div className="flex gap-1">
            <Image
              alt="rating"
              src={getIconPath(ICON.star.fill)}
              width={14}
              height={14}
              className="px-[1px]"
            />
            <h4 className="text-neutral-500">{rating}</h4>
          </div>
        </div>
        <h4 className="w-[95%] mt-2 text-neutral-600 text-ellipsis line-clamp-1 sm:hidden">
          {desc}
        </h4>
      </div>
    </div>
  );
}

export default AreaTagCard;
