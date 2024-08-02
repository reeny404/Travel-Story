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
      openModal("로그인 필요", "로그인 유저만 가능합니다");
    } else {
      setBottomSheetVisible(true);
    }
  };

  const handleClose = () => {
    setBottomSheetVisible(false);
  };

  const toggleBookmark = () => {
    if (!isLoggedIn) {
      openModal("로그인 필요", "로그인 유저만 가능합니다");
    } else {
      isBookmarked ? deleteBookmark.mutate() : addBookmark.mutate();
    }
  };
  const BottomSheet = createAddBottomSheet();
  return (
    <article className="h-11 w-full flex gap-x-2 sticky bottom-5 z-[9999]">
      {isBottomSheetVisible && (
        <BottomSheet area={area} onClose={handleClose} />
      )}
      <button
        onClick={() => deleteBookmark.mutate()}
        className="w-11 h-full p-[10px] ml-4 relative flex justify-center items-center border-2 bg-white rounded-lg aspect-auto"
      >
        <Image
          src={
            isBookmarked
              ? `/icons/${ICON.bookmark.big.on}.png`
              : `/icons/${ICON.bookmark.big.off}.png`
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
        className=" bg-gray-300 w-full border rounded-md mr-4"
      >
        내 여행에 추가
      </button>
    </article>
  );
}

export default UnderBar;
