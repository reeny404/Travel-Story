"use client";
import { api } from "@/apis/api";
import RatingIcons from "@/components/Card/RatingIcons";
import ReviewDropdownMenu from "@/components/DropdownMenu/ReviewDropdownMenu";
import { useAuth } from "@/contexts/auth.contexts";
import { AreaReview } from "@/types/Recommend";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createEditwBottomSheet } from "../BottomSheet/EditSheet/ReviewSheet/EditBottomSheet";
import VanilaImgFrame from "../VanilaImgFram";

// props로 유저정보, 리뷰정보를 받아야함.
type AreaReviewCardProps = {
  name: string;
  createdAt: string;
  userImageUrl: string | null;
  imageUrl: string;
  rating: number;
  description: string;
  reviewInfo: AreaReview;
};

function AreaReviewCard({
  name,
  createdAt,
  userImageUrl,
  imageUrl,
  rating = 0,
  description,
  reviewInfo,
}: AreaReviewCardProps) {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const { isLoggedIn } = useAuth();
  const date = createdAt.slice(0, 10).replaceAll("-", ".");
  const queryClient = useQueryClient();

  const handleOpen = () => {
    setBottomSheetVisible(true);
  };

  const handleClose = () => {
    setBottomSheetVisible(false);
  };

  const BottomSheet = createEditwBottomSheet();
  const { mutate: deleteReview } = useMutation({
    mutationFn: async (id: number) => {
      await api.review.deleteReview(id);
    },
    onError: (error) => {
      console.error("Error adding data:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areaReviews"] });
    },
  });

  const handleDelete = async (id: number) => {
    try {
      deleteReview(id);
    } catch (error) {
      console.error("error deleting data", error);
    }
  };
  return (
    <section className="w-full flex flex-col px-4">
      {isBottomSheetVisible && (
        <BottomSheet
          areaName={reviewInfo.areaName}
          onClose={handleClose}
          areaId={reviewInfo.areaId!}
          id={reviewInfo.userId!}
          reviewInfo={reviewInfo}
        />
      )}
      <article className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <VanilaImgFrame
            imageUrl={userImageUrl || "/icons/avatar.svg"}
            alt="icon"
            width="w-11"
            height="h-11"
            frameClassName="bg-white rounded-full relative aspect-auto"
            imageClassName="rounded-full object-contain"
          />

          <div className="flex flex-col justify-center gap-y-1 pl-4 relation">
            <h1 className="text-sm font-bold">{name}</h1>
            <p className="text-xs font-semibold">{date}</p>
          </div>
        </div>

        {isLoggedIn && (
          <ReviewDropdownMenu
            handleOpen={handleOpen}
            handleDelete={() => handleDelete(reviewInfo.id)}
          />
        )}
      </article>
      <div className="mt-7">
        <RatingIcons type="small" rating={rating} />
      </div>
      <p className="w-full mt-3 text-xs text-ellipsis line-clamp-3 ">
        {description}
      </p>
      {imageUrl && (
        <VanilaImgFrame
          imageUrl={imageUrl}
          alt="reviewImg"
          width="w-full"
          height="h-[220px]"
          frameClassName="relative aspect-auto mt-3 mb-12 hover:cursor-pointer "
          imageClassName="object-cover rounded-lg"
        />
      )}
    </section>
  );
}

export default AreaReviewCard;
