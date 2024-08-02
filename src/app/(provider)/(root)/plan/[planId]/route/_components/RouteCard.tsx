import { getIconPath } from "@/components/commons/Icon/getIconPath";
import ImageFrame from "@/components/Frame/ImageFrame";
import { ICON } from "@/constants/icon";

export type Route = {
  index: number;
  title: string;
  imageUrl: string | null;
  address: string;
  openTime: string;
};

type Props = {
  route: Route;
};

const iconMaker = getIconPath(ICON.location.gray);
const iconTime = getIconPath(ICON.time.gray);

function RouteCard({ route }: Props) {
  return (
    <>
      <div className="w-6 h-6 flex justify-center items-center relative top-8 left-2 z-20 rounded-full bg-slate-600 text-white">
        {route.index}
      </div>
      <div className="w-[96%] flex flex-row space-x-4 p-3 bg-white border-2 border-gray-400 rounded-md">
        <ImageFrame
          src={route.imageUrl}
          alt="schedule 사진"
          className="w-1/3 h-32 rounded-sm bg-gray-100"
          roundType="sm"
        />
        <div className="flex flex-col space-y-4">
          <div className="text-lg font-bold">{route.title}</div>
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 items-center">
              <ImageFrame src={iconMaker} className="w-4 h-4" />
              <span>{route.address}</span>
            </div>
            <div className="flex space-x-2 items-center">
              <ImageFrame src={iconTime} className="w-4 h-4" />
              <span>{route.openTime}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RouteCard;
