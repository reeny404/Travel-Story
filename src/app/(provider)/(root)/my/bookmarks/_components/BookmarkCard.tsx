import ImageFrame from "@/components/Frame/ImageFrame";
import { BookmarkWithArea } from "@/types/Recommend";
import { MyBookmarkPageParams } from "../page";
import AddToPlanButton from "./AddToPlanButton";
import BookmarkButton from "./BookmarkButton";

type AreaCardProps = {
  bookmark: BookmarkWithArea;
  params: MyBookmarkPageParams;
};

function BookmarkCard({ bookmark, params }: AreaCardProps) {
  const { area } = bookmark;
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
          {/* <Icon icon={ICON.star.fill} size={16} /> */}
          <span className="text-sm">4.6</span>
        </div>
        <div className="flex justify-end text-sm">
          <AddToPlanButton plan={params} area={area} />
        </div>
      </div>
    </div>
  );
}

export default BookmarkCard;
