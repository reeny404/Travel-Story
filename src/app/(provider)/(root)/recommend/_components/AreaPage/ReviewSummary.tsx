"use client";
import RatingIcons from "@/components/Card/RatingIcons";
import { useAuth } from "@/contexts/auth.contexts";
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
  const { user } = useAuth();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const handleOpen = () => {
    setBottomSheetVisible(true);
  };
  const handleClose = () => {
    setBottomSheetVisible(false);
  };

  const BottomSheet = createReviewBottomSheet();

  return (
    <div className="w-full">
      {isBottomSheetVisible && (
        <BottomSheet
          areaName={areaName}
          onClose={handleClose}
          areaId={areaId}
          id={user?.id!}
        />
      )}
      <div className="w-full flex justify-between p-3">
        <span className="text-lg font-bold">리뷰</span>
        <button
          onClick={() => handleOpen()}
          className="text-sm font-bold flex items-center aspect-auto"
        >
          <Image
            src="/icon/edit.svg"
            alt="edit"
            width={12}
            height={12}
            className="mr-1 object-contain w-auto h-auto"
          />
          <span>리뷰작성</span>
        </button>
      </div>
      <div className="w-full grid grid-cols-2 p-3">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <p className="text-3xl">{rating}</p>
          <div>
            <RatingIcons type="small" rating={rating} />
          </div>
          <p className="text-xm text-[#8B8B8B]">{`(${ratingAmount})`}</p>
        </div>
        <div className="flex flex-col gap-y-1 p-1  justify-center">
          <div className="flex gap-x-1 text-sm font-semibold relative">
            <Image
              src="/icon/delicious.png"
              alt="image"
              width={15}
              height={15}
              className="object-contain"
            />
            <span>음식이 맛있어요</span>
          </div>
          <div className="flex gap-x-1 text-sm font-semibold">
            {" "}
            <Image
              src="/icon/clean.png"
              alt="image"
              width={15}
              height={15}
              className="object-contain"
            />
            <span>시설이 청결해요</span>
          </div>
          <div className="flex gap-x-1 text-sm font-semibold">
            {" "}
            <Image
              src="/icon/cool.png"
              alt="image"
              width={15}
              height={15}
              className="object-contain"
            />
            <span>인테리어가 멋져요</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewSummaryCard;
