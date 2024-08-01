"use client";
import { ICON } from "@/constants/icon";
import { useAuth } from "@/contexts/auth.contexts";
import { useBookmarks } from "@/hooks/useBookmark";
import { Area } from "@/types/Recommend";
import Image from "next/image";
import { useState } from "react";
import { createAddBottomSheet } from "../BottomSheet/AddAreaSheet/AddBottomSheet";

type UnderBarProps = {
  area: Area;
  handleAddPlan?: () => void;
};

function UnderBar({ area }: UnderBarProps) {
  const { isBookmarked, addBookmark, deleteBookmark } = useBookmarks(area.id);
  const { user } = useAuth();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const handleOpen = () => {
    setBottomSheetVisible(true);
  };
  const handleClose = () => {
    setBottomSheetVisible(false);
  };

  const BottomSheet = createAddBottomSheet();

  return (
    <div className="w-full h-10 px-3 flex gap-x-2 fixed bottom-0">
      {isBottomSheetVisible && (
        <BottomSheet area={area} onClose={handleClose} />
      )}
      <button
        onClick={() => deleteBookmark.mutate()}
        className="w-14 h-full p-2 relative flex justify-center items-center border border-2  bg-white rounded-md aspect-auto"
      >
        <Image
          src={
            isBookmarked
              ? `/icons/${ICON.bookmark.on.name}.svg`
              : `/icons/${ICON.bookmark.off.name}.svg`
          }
          alt="bookmark"
          width={30}
          height={30}
          className="hover:cursor-pointer object-contain"
          onClick={() =>
            isBookmarked ? deleteBookmark.mutate() : addBookmark.mutate()
          }
        />
      </button>

      <button
        onClick={handleOpen}
        className="w-72 h-full bg-gray-300 border rounded-md"
      >
        내 여행에 추가
      </button>
    </div>
  );
}

export default UnderBar;
