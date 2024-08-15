import RatingIcons from "@/components/Card/RatingIcons";
import { getIconPath } from "@/components/commons/Icon/getIconPath";
import { ICON } from "@/constants/icon";
import { useAuth } from "@/contexts/auth.contexts";
import { useModalStore } from "@/stores/modal.store";
import Image from "next/image";
import React, { useState } from "react";
import { createReviewBottomSheet } from "../BottomSheet/ReviewBottomSheet";

type ReviewSummaryCardProps = {
  rating: number;
  ratingAmount: number;
  areaId: number;
  areaName: string;
};

const ReviewSummaryCard = React.memo(
  ({ rating, areaId, areaName, ratingAmount }: ReviewSummaryCardProps) => {
    const { user, isLoggedIn } = useAuth();
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const { openModal } = useModalStore();

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

    const BottomSheet = createReviewBottomSheet();

    return (
      <section className="w-full md:w-[216px] h-full md:h-[340px] pb-8 px-4 md:p-0">
        {isBottomSheetVisible && (
          <BottomSheet
            areaName={areaName}
            onClose={handleClose}
            areaId={areaId}
            id={user?.id!}
          />
        )}
        <header className="w-full flex md:hidden justify-between mb-7 pt-8 md:pt-0 relative aspect-auto">
          <span className="text-lg font-bold">리뷰</span>
          <button
            onClick={handleOpen}
            className="text-sm font-bold flex items-center aspect-auto"
          >
            <Image
              src={getIconPath(ICON.edit.color)}
              alt="edit"
              width={16}
              height={16}
              className="mr-1 object-contain"
            />
            <span className="text-[#C4E00B]">리뷰작성</span>
          </button>
        </header>
        <article className="flex h-[126px] md:h-full  gap-x-3 md:flex-col md:gap-y-3">
          <div className="flex flex-col p-6 md:p-8 min-w-[132px] md:h-[136px] items-center justify-center rounded-lg bg-[#F6F6F6] md:border-[#DFDFDF] md:border md:bg-white">
            <p className="text-[32px] mb-4">{rating}</p>
            <div className="mb-1">
              <RatingIcons type="small" rating={rating} />
            </div>
            <p className="text-xs ">{`(${ratingAmount})`}</p>
          </div>
          <div className="w-full md:h-[136px] flex flex-col gap-y-1 justify-center py-5 px-4 md:p-8 border-[0.6px] border-[#DFDFDF] md:bg-[#F6F6F6] md:border-none rounded-lg">
            <div className=" min-w-[135px] flex text-sm font-semibold relative">
              <Image
                src="/icons/emoji-dinner.svg"
                alt="image"
                width={16}
                height={16}
                className="object-contain"
              />
              <span className="pl-3">음식이 맛있어요</span>
            </div>
            <div className="flex text-sm font-semibold relative">
              <Image
                src="/icons/emoji-sparkles.svg"
                alt="image"
                width={16}
                height={16}
                className="object-contain"
              />
              <span className="pl-3">시설이 청결해요</span>
            </div>
            <div className="flex text-sm font-semibold relative">
              <Image
                src="/icons/emoji-window.svg"
                alt="image"
                width={16}
                height={16}
                className="object-contain"
              />
              <span className="pl-3">인테리어가 멋져요</span>
            </div>
          </div>
          <button
            onClick={handleOpen}
            className="bg-[#383838] hidden md:flex text-white w-full justify-center gap-x-2 items-center border border-black rounded-lg h-[44px]"
          >
            <Image
              src={`/icons/${ICON.areaCalender.big.area}.svg`}
              alt="calender"
              width={20}
              height={20}
              className="hover:cursor-pointer object-contain"
            />
            <p>리뷰쓰기</p>
          </button>
        </article>
      </section>
    );
  },
  (prevProps, nextProps) => prevProps.rating === nextProps.rating
);

ReviewSummaryCard.displayName = "ReviewSummaryCard";

export default ReviewSummaryCard;
