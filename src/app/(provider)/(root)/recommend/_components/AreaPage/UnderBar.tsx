"use client";
import { useAuth } from "@/contexts/auth.contexts";
import { useBookmarks } from "@/hooks/useBookmark";
import { Area } from "@/types/Recommend";
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
      {isBookmarked ? (
        <button
          onClick={() => deleteBookmark.mutate()}
          className="w-14 h-full bg-blue-500 border rounded-md"
        >
          북X
        </button>
      ) : (
        <button
          onClick={() => addBookmark.mutate()}
          className="w-14 h-full bg-blue-500 border rounded-md"
        >
          북O
        </button>
      )}
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
