import { getIconPath } from "@/components/commons/Icon/getIconPath";
import ImageFrame from "@/components/Frame/ImageFrame";
import { ICON } from "@/constants/icon";
import { Tables } from "@/types/supabase";
import { cva } from "class-variance-authority";
import { useMemo } from "react";
import { Color, getColorName } from "../../../_components/Color";

const NumberVariant = cva(
  "w-6 h-6 flex justify-center items-center rounded-full text-white",
  {
    variants: {
      color: {
        red: "bg-red-400",
        green: "bg-green-700",
        purple: "bg-purple-400",
        blue: "bg-blue-500",
        default: "bg-gray-750",
      },
    },
    defaultVariants: { color: "default" },
  }
);

type PlaceType = "관광지" | "호텔" | "식당" | "쇼핑";

type Props = {
  index: number;
  schedule: Tables<"schedule">;
};

const IconType: Record<PlaceType, { icon: string; color: string }> = {
  관광지: { icon: getIconPath(ICON.place.color), color: "text-green-700" },
  호텔: {
    icon: getIconPath(ICON.accommodation.color),
    color: "text-blue-500",
  },
  식당: { icon: getIconPath(ICON.restaurant.color), color: "text-red-400" },
  쇼핑: { icon: getIconPath(ICON.shop.color), color: "text-purple-500" },
};

function RouteCard({ index, schedule }: Props) {
  const color: Color = useMemo(() => {
    return getColorName(index - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);

  const { title, type, place } = schedule;

  return (
    <div className="p-3 space-y-3 flex flex-col bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <div
          className={NumberVariant({
            color,
          })}
        >
          {index}
        </div>
        <div className="flex-1 indent-2 text-lg font-bold">{title}</div>
        <ImageFrame src={getIconPath(ICON.share.black)} className="w-4 h-4" />
      </div>
      <div className="flex space-x-3 leading-5">
        <div className="">
          <ImageFrame
            src={null}
            alt="areaImg"
            className="w-20 h-24 rounded-sm bg-gray-100"
            round="lg"
          />
        </div>
        <div className="flex flex-col space-y-3">
          <span className="flex space-x-2 items-start font-medium">
            <span>
              <ImageFrame
                src={null}
                // src={IconType[schedule.type].icon}
                className="w-5 h-5"
              />
            </span>
            <span
            // className={clsx(IconType[schedule.type].color, "leading-5")}
            >
              {type}
            </span>
            <span className="text-gray-400"> | </span>
            <span className="text-olive-800">영업중</span>
          </span>
          <span className="flex space-x-2 items-start">
            <span>
              <ImageFrame
                src={getIconPath(ICON.location.gray)}
                className="w-5 h-5"
              />
            </span>
            <span className="leading-6">{place}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default RouteCard;
