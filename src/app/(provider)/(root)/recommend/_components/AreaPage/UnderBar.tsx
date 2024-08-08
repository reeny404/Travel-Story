"use client";
import { ICON } from "@/constants/icon";
import { useAuth } from "@/contexts/auth.contexts";
import { useBookmarks } from "@/hooks/useBookmark";
import { useModalStore } from "@/stores/modal.store";
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

  const { isLoggedIn } = useAuth();
  const { openModal } = useModalStore();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleOpen = () => {
    if (!isLoggedIn) {
      openModal("로그인하면 일정에 장소를 추가할 수 있어요");
    } else {
      setBottomSheetVisible(true);
    }
  };

  const handleClose = () => {
    setBottomSheetVisible(false);
  };

  const toggleBookmark = () => {
    if (!isLoggedIn) {
      openModal("로그인하면 일정에 장소를 추가할 수 있어요");
    } else {
      isBookmarked ? deleteBookmark.mutate() : addBookmark.mutate();
    }
  };
  const BottomSheet = createAddBottomSheet();
  return (
    <article className="h-11 w-full flex gap-x-2 sticky bottom-5 z-underbar">
      {isBottomSheetVisible && (
        <BottomSheet area={area} onClose={handleClose} />
      )}
      <button
        onClick={() => deleteBookmark.mutate()}
        className="w-11 h-full p-3 relative flex justify-center items-center border border-black backdrop-blur-[10px] rounded-lg aspect-auto"
      >
        <Image
          src={
            isBookmarked
              ? `/icons/${ICON.bookmark.big.on.name}.svg`
              : `/icons/${ICON.bookmark.big.off.name}.svg`
          }
          alt="bookmark"
          width={16}
          height={16}
          className="hover:cursor-pointer object-contain"
          onClick={toggleBookmark}
        />
      </button>

      <button
        onClick={handleOpen}
        className="bg-[#383838] text-white w-full flex justify-center gap-x-2 items-center border border-black rounded-lg py-[11px]"
      >
        <Image
          src={`/icons/${ICON.areaCalender.big.area}.svg`}
          alt="calender"
          width={20}
          height={20}
          className="hover:cursor-pointer object-contain"
        />
        <p>내 여행에 추가</p>
      </button>
    </article>
  );
}

export default UnderBar;
