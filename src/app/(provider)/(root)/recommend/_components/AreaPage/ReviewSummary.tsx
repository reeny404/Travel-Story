"use client";
import RatingIcons from "@/components/Card/RatingIcons";
import { ICON } from "@/constants/icon";
import { useAuth } from "@/contexts/auth.contexts";
import { useModalStore } from "@/stores/modal.store";
import Image from "next/image";
import { useState } from "react";
import { createReviewBottomSheet } from "../BottomSheet/ReviewSheet/ReviewBottomSheet";

type ReviewSummaryCardProps = {
  rating: number;
  ratingAmount: number;
  areaId: number;
  areaName: string;
};

function ReviewSummaryCard({
  rating,
  areaId,
  areaName,
  ratingAmount,
}: ReviewSummaryCardProps) {
  const { user, isLoggedIn } = useAuth();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const { openModal } = useModalStore();
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

  const BottomSheet = createReviewBottomSheet();

  return (
    <section className="w-full h-full pb-8 px-4">
      {isBottomSheetVisible && (
        <BottomSheet
          areaName={areaName}
          onClose={handleClose}
          areaId={areaId}
          id={user?.id!}
        />
      )}
      <header className="w-full flex justify-between mb-5 pt-6 relative aspect-auto">
        <span className="text-lg font-bold">리뷰</span>
        <button
          onClick={() => handleOpen()}
          className="text-sm font-bold flex items-center aspect-auto"
        >
          <Image
            src={`/icons/${ICON.edit.color}.svg`}
            alt="edit"
            width={16}
            height={16}
            className="mr-1 object-contain"
          />
          <span className="text-[#C4E00B]">리뷰작성</span>
        </button>
      </header>
      <article className="grid grid-cols-2 gap-3 ">
        <div className="flex flex-col p-6 items-center justify-center rounded-lg bg-[#F6F6F6]">
          <p className="text-[32px] mb-4">{rating}</p>
          <div className="mb-1">
            <RatingIcons type="small" rating={rating} />
          </div>
          <p className="text-xs ">{`(${ratingAmount})`}</p>
        </div>
        <div className="w-full flex flex-col gap-y-1 justify-center  py-5 px-4 border-[0.6px] border-[#DFDFDF] rounded-lg">
          <div className="w-full flex text-sm font-semibold relative">
            <Image
              src="/icons/emoji-dinner.svg"
              alt="image"
              width={16}
              height={16}
              className="object-contain"
            />
            <span className="pl-[2px]">음식이 맛있어요</span>
          </div>
          <div className="w-full flex text-sm font-semibold relative">
            <Image
              src="/icons/emoji-sparkles.svg"
              alt="image"
              width={16}
              height={16}
              className="object-contain"
            />
            <span className="pl-[2px]">시설이 청결해요</span>
          </div>
          <div className="flex text-sm font-semibold relative">
            {" "}
            <Image
              src="/icons/emoji-window.svg"
              alt="image"
              width={16}
              height={16}
              className="object-contain"
            />
            <span className="pl-[2px]">인테리어가 멋져요</span>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ReviewSummaryCard;
