"use client";
import { api } from "@/apis/api";
import { AreaReview, ImgFileType } from "@/types/Recommend";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import EditBottomSheetImages from "./EditBottomSheetImages";
import ReviewBottomSheetInput from "./EditBottomSheetInput";
import ReviewBottomSheetRating from "./EditBottomSheetRating";
import ReviewBottomSheetTitle from "./EditBottomSheetTitle";

type EditSheetProps = {
  onClose: () => void;
  areaId: number;
  id: string; // 추가
  areaName: string;
  reviewInfo: AreaReview;
};

function EditBottomSheet({ onClose, reviewInfo }: EditSheetProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [imgFile, setImgFile] = useState<ImgFileType[]>([]);
  const [textValue, setTextValue] = useState<string>(reviewInfo.content! ?? "");
  const [rating, setRating] = useState<number>(reviewInfo.rating ?? 0);
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  useEffect(() => {
    setImgFile(() => reviewInfo.imageUrls);
  }, []);
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };
  const handleRatingClick = (rating: number, idx: number) => {
    if (rating === idx) {
      setRating((prev) => prev - 1);
      return;
    }
    setRating(idx);
  };

  useEffect(() => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 300);
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
      updateReview(formData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-bottomSheet bg-black${
        isOpening || isClosing ? "transition-opacity duration-300" : ""
      } ${isOpening ? "bg-opacity-0" : "bg-opacity-50"}`}
      onClick={handleClose}
    >
      <form
        ref={formRef}
        className={`absolute bottom-0 left-0 w-full h-[660px] pt-7 rounded-t-3xl shadow-bottom-sheet bg-white transform${
          isClosing
            ? "translate-y-full"
            : isOpening
              ? "translate-y-full"
              : "translate-y-0"
        }transition-transform duration-300`}
      >
        <section className="relative w-full h-full flex flex-col">
          <article className="relative w-full flex px-5 flex-col gap-y-8 ">
            <ReviewBottomSheetTitle />
            <ReviewBottomSheetRating
              rating={rating}
              handleRatingClick={handleRatingClick}
            />
            <div className="w-full flex flex-col gap-y-3">
              <ReviewBottomSheetInput
                textValue={textValue}
                setTextValue={setTextValue}
              />
              <EditBottomSheetImages
                imgFile={imgFile}
                setImgFile={setImgFile}
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
      </form>
    </div>
  );
}

export function createEditwBottomSheet() {
  return function EditBottomSheetWrapper({
    onClose,
    areaId,
    areaName,
    id,
    reviewInfo,
    // 추가
  }: EditSheetProps) {
    return (
      <EditBottomSheet
        areaName={areaName}
        onClose={onClose}
        areaId={areaId}
        reviewInfo={reviewInfo}
        id={id} // 전달
      />
    );
  };
}

export default EditBottomSheet;
