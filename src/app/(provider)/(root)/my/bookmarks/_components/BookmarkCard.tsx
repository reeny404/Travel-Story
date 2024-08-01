import { getIconPath } from "@/components/commons/Icon/getIconPath";
import ImageFrame from "@/components/Frame/ImageFrame";
import { ICON } from "@/constants/icon";
import { Schedule } from "@/types/plan";
import { Area, AreaBookmark } from "@/types/Recommend";
import { useCallback, useMemo } from "react";
import BookmarkButton from "./BookmarkButton";

type AreaCardProps = {
  bookmark: AreaBookmark;
  area: Area;
  onClickAddToPlan: (data: Schedule) => void;
};

function BookmarkCard({ bookmark, area, onClickAddToPlan }: AreaCardProps) {
  const iconMarkderPath: string = useMemo(() => {
    return getIconPath(ICON.calendar.white);
  }, []);
  const iconClendarPath: string = useMemo(() => {
    return getIconPath(ICON.calendar.white);
  }, []);

  const handleOnClickToAdd = useCallback(() => {
    const data: Schedule = {
      title: area.krName!,
      latlng: { lat: area.lat!, lng: area.lng! },
      areaId: area.id,
    };

    onClickAddToPlan(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div key={bookmark.id} className="flex rounded mx-4 bg-white">
      <div className="w-1/3">
        <ImageFrame
          src={area.imageUrl}
          className="w-full h-full bg-slate-200"
        />
      </div>
      <div className="w-2/3 px-2 py-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-bold">{area.krName}</h2>
          <BookmarkButton areaId={area.id} />
        </div>
        <p className="py-2 text-sm overflow-hidden text-nowrap text-ellipsis">
          {area.description}
        </p>
        <div className="flex items-center">
          <ImageFrame src={iconMarkderPath} className="w-4 h-4" />
          <span className="text-sm">콜로세움 근처, 로마</span>
        </div>
        <div className="flex justify-end text-sm">
          <button
            className="h-8 flex justify-center items-center px-3 mt-4 rounded-full bg-blue-500 text-white"
            onClick={handleOnClickToAdd}
          >
            <ImageFrame src={iconClendarPath} className="w-4 h-4 mr-2" />내
            여행에 추가
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookmarkCard;
