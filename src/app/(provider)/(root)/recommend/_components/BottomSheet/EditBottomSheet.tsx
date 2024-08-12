"use client";
import { api } from "@/apis/api";
import { AreaReview, ImgFileType } from "@/types/Recommend";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { BottomSheet } from "./BottomSheet";
import BottomSheetImages from "./BottomSheetImages";
import BottomSheetInput from "./BottomSheetInput";
import BottomSheetRating from "./BottomSheetRating";
import BottomSheetTitle from "./BottomSheetTitle";

type EditSheetProps = {
  onClose: () => void;
  areaName: string;
  reviewInfo: AreaReview;
};
type editType = {};
function EditBottomSheet<T>({ onClose, reviewInfo }: EditSheetProps & T) {
  const [imgFile, setImgFile] = useState<ImgFileType[]>([]);
  const [textValue, setTextValue] = useState<string>(reviewInfo.content! ?? "");
  const [rating, setRating] = useState<number>(reviewInfo.rating ?? 0);
  const queryClient = useQueryClient();

  useEffect(() => {
    setImgFile(() => reviewInfo.imageUrls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRatingClick = useCallback((rating: number, idx: number) => {
    setRating((prev) => (rating === idx ? prev - 1 : idx));
  }, []);

  const { mutate: updateReview } = useMutation({
    mutationFn: async (formData: FormData) => {
      onClose();
      const response = await api.review.updateReview(formData);
      return response.data;
    },
    onError: (error) => {
      console.error("Error adding data:", error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["areaReviews"] });
      queryClient.invalidateQueries({ queryKey: ["area", reviewInfo.areaId] });
      return data;
    },
  });

  const handleUpdate = async () => {
    const formData = new FormData();
    for (let i = 0; i < imgFile.length; i++) {
      const fileItem = imgFile[i];
      if (typeof fileItem !== "string") {
        formData.append("imgFile", fileItem.file);
        formData.append("imgFileName", fileItem.name);
      } else {
        formData.append("stringImgFile", fileItem);
      }
    }
    formData.append("id", reviewInfo.id.toString());
    formData.append("userId", reviewInfo.userId);
    formData.append("areaId", reviewInfo.areaId!.toString());
    formData.append("textValue", textValue);
    formData.append("rating", rating.toString());
    formData.append("areaName", reviewInfo.areaName);

    try {
      onClose();
      updateReview(formData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  //
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
            <BottomSheetImages
              imgFile={imgFile}
              setImgFile={setImgFile}
              initializeImages={true}
            />
          </div>
        </article>
        <div className="absolute bottom-6 w-full px-5">
          <button
            className={clsx(
              "bg-button-disable w-full h-10 text-center text-neutral-450 rounded-lg",
              {
                "!bg-neutral-750 !text-white": textValue.length > 0,
              }
            )}
            type="button"
            onClick={handleUpdate}
          >
            {textValue.length === 0 ? "작성을 완료해주세요" : "리뷰 수정하기"}
          </button>
        </div>
      </section>
    </BottomSheet>
  );
}

export function createEditBottomSheet() {
  return function EditBottomSheetWrapper({
    onClose,
    areaName,
    reviewInfo,
    // 추가
  }: EditSheetProps) {
    return (
      <EditBottomSheet<editType>
        areaName={areaName}
        onClose={onClose}
        reviewInfo={reviewInfo}
      />
    );
  };
}

export default EditBottomSheet;
