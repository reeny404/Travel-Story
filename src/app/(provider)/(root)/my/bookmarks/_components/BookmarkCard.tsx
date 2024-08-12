import Icon from "@/components/commons/Icon";
import ImageFrame from "@/components/Frame/ImageFrame";
import { extendBookmark } from "@/types/Recommend";
import { ICON } from "@/constants/icon";
import { BookmarkWithArea } from "@/types/Recommend";
import { MyBookmarkPageParams } from "../page";
import AddToPlanButton from "./AddToPlanButton";
import BookmarkButton from "./BookmarkButton";

type AreaCardProps = {
  bookmark: extendBookmark;
  params: MyBookmarkPageParams;
};

function BookmarkCard({ bookmark, params }: AreaCardProps) {
  const { area } = bookmark;
  return (
    <div
      key={bookmark.id}
      className="rounded mx-4 p-4 bg-white shadow-bookmark-card"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold">{area.krName}</h2>
        <BookmarkButton areaId={area.id} />
      </div>
      <div className="flex h-full">
        <div className="w-1/4 h-24 mr-3 rounded-xl overflow-hidden">
          <ImageFrame
            src={area.imageUrl}
            className="w-full h-full bg-slate-200 "
          />
        </div>
        <div className="w-3/4">
          {/* <div className="mb-2 flex items-center justify-between"></div> */}
          <p className="text-sm line-clamp-2">{area.description}</p>
          <div className="flex items-center">
            <Icon icon={ICON.star.fill} alt="arrow" size={16} />
            <span className="text-sm">4.6</span>
          </div>
          <div className="flex justify-end text-sm">
            <AddToPlanButton plan={params} area={area} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookmarkCard;
