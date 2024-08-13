"use client";
import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { ImgFileType } from "@/types/Recommend";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useCallback, useMemo, useState } from "react";
import { BottomSheet } from "./BottomSheet";
import BottomSheetImages from "./BottomSheetImages";
import BottomSheetInput from "./BottomSheetInput";
import BottomSheetRating from "./BottomSheetRating";
import BottomSheetTitle from "./BottomSheetTitle";

type ReviewBottomSheetProps = {
  onClose: () => void;
  areaId: number;
  id: string; // 추가
  areaName: string;
};

function ReviewBottomSheet({
  onClose,
  areaId,
  id,
  areaName,
}: ReviewBottomSheetProps) {
  const [imgFile, setImgFile] = useState<ImgFileType[]>([]);
  const [textValue, setTextValue] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const nickname = useMemo(
    () =>
      user?.app_metadata.provider === "kakao"
        ? user?.user_metadata.name
        : user?.user_metadata.nickname,
    [user]
  );

  const profileImg = useMemo(() => user?.user_metadata.avatar_url, [user]);

  const handleRatingClick = useCallback((rating: number, idx: number) => {
    setRating((prev) => (rating === idx ? prev - 1 : idx));
  }, []);

  const { mutate: addReview, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await api.review.addReview(formData);
      onClose();
      return response.data;
    },
    onError: (error) => {
      console.error("Error adding data:", error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["areaReviews"] });
      queryClient.invalidateQueries({ queryKey: ["area", areaId] });
      return data;
    },
  });

  const handleAdd = async () => {
    const formData = new FormData();
    for (let i = 0; i < imgFile.length; i++) {
      const fileItem = imgFile[i];
      if (typeof fileItem !== "string") {
        formData.append("imgFile", fileItem.file);
        formData.append("imgFileName", fileItem.name);
      }
    }
    formData.append("nickname", nickname);
    formData.append("profileImg", profileImg);
    formData.append("userId", id);
    formData.append("areaId", areaId.toString());
    formData.append("textValue", textValue);
    formData.append("rating", rating.toString());
    formData.append("areaName", areaName);

    try {
      addReview(formData);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  return (
    <BottomSheet onClose={onClose} height="660px">
      <section className="relative w-full h-full flex flex-col">
        <article className="relative w-full flex px-5 flex-col gap-y-8 ">
          <BottomSheetTitle title="리뷰작성" />

          <BottomSheetRating
            rating={rating}
            handleRatingClick={handleRatingClick}
          />
          <div className="w-full flex flex-col gap-y-3">
            <BottomSheetInput
              textValue={textValue}
              setTextValue={setTextValue}
            />

            <BottomSheetImages imgFile={imgFile} setImgFile={setImgFile} />
          </div>
        </article>

        <div className="absolute bottom-6 w-full px-5">
          <button
            className={clsx(
              "bg-button-disable w-full h-10 text-center text-neutral-450 rounded-lg",
              {
                "!bg-neutral-750 !text-white":
                  textValue.length > 0 && !isPending,
              }
            )}
            disabled={isPending}
            type="button"
            onClick={handleAdd}
          >
            {textValue.length === 0 ? "작성을 완료해주세요" : "리뷰 등록하기"}
          </button>
        </div>
      </section>
    </BottomSheet>
  );
}

export function createReviewBottomSheet() {
  return function ReviewBottomSheetWrapper({
    onClose,
    areaId,
    areaName,
    id,
    // 추가
  }: ReviewBottomSheetProps) {
    return (
      <ReviewBottomSheet
        areaName={areaName}
        onClose={onClose}
        areaId={areaId}
        id={id} // 전달
      />
    );
  };
}

export default ReviewBottomSheet;
