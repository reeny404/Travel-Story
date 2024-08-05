import { getIconPath } from "@/components/commons/Icon/getIconPath";
import ImageFrame from "@/components/Frame/ImageFrame";
import { ICON } from "@/constants/icon";
import { LatLng } from "@/types/LatLng";
import { cva } from "class-variance-authority";
import clsx from "clsx";
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
export type Route = {
  index: number;
  type: PlaceType;
  title: string;
  imageUrl: string | null;
  address: string;
  openTime: string;
  latlng: LatLng;
};

type Props = {
  route: Route;
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

const iconShare = getIconPath(ICON.share.black);
const iconMaker = getIconPath(ICON.location.gray);

function RouteCard({ route }: Props) {
  const color: Color = useMemo(() => {
    return getColorName(route.index - 1);
  }, [route]);

  return (
    <div className="w-[360px] p-3 ml-2.5 space-y-3 flex flex-col bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <div
          className={NumberVariant({
            color,
          })}
        >
          {route.index}
        </div>
        <div className="flex-1 indent-2 text-lg font-bold">{route.title}</div>
        <ImageFrame src={iconShare} className="w-4 h-4" />
      </div>
      <div className="flex space-x-3 leading-5">
        <div className="">
          <ImageFrame
            src={route.imageUrl}
            alt="areaImg"
            className="w-20 h-24 rounded-sm bg-gray-100"
            round="lg"
          />
        </div>
        <div className="flex flex-col space-y-3">
          <span className="flex space-x-2 items-start font-medium">
            <span>
              <ImageFrame src={IconType[route.type].icon} className="w-5 h-5" />
            </span>
            <span className={clsx(IconType[route.type].color, "leading-5")}>
              {route.type}
            </span>
            <span className="text-gray-400"> | </span>
            <span className="text-olive-800">영업중</span>
          </span>
          <span className="flex space-x-2 items-start">
            <span>
              <ImageFrame src={iconMaker} className="w-5 h-5" />
            </span>
            <span className="leading-6">{route.address}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default RouteCard;
