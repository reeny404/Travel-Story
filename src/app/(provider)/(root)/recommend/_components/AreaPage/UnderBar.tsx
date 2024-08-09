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
  const { isBookmarked, addBookmark, deleteBookmark } = useBookmarks({
    areaId: area.id,
  });

  const { isLoggedIn } = useAuth();
  const { openModal, setNextUrl } = useModalStore();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleOpen = () => {
    if (!isLoggedIn) {
      openModal("로그인하면 일정에 장소를 추가할 수 있어요");
      setNextUrl(`/recommend/area/${area.id}`);
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
      if (isBookmarked) {
        deleteBookmark.mutate(area.id);
      }
      if (!isBookmarked) {
        addBookmark.mutate(area.id);
      }
    }
  };
  const BottomSheet = createAddBottomSheet();

  return (
    <article className="h-11 w-full flex gap-x-2 sticky bottom-5 z-underbar">
      {isBottomSheetVisible && (
        <BottomSheet area={area} onClose={handleClose} />
      )}
      <button
        onClick={toggleBookmark}
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
