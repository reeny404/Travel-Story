"use client";
import { api } from "@/apis/api";
import { useEffect, useRef, useState } from "react";
import ReviewBottomSheetImages from "./ReviewBottomSheetImages";
import ReviewBottomSheetInput from "./ReviewBottomSheetInput";
import ReviewBottomSheetRating from "./ReviewBottomSheetRating";
import ReviewBottomSheetTitle from "./ReviewBottomSheetTitle";

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
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [imgFile, setImgFile] = useState<{ name: string; file: File }[]>([]);
  const [textValue, setTextValue] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

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
      setRating(0);
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

  const handleAdd = async () => {
    const formData = new FormData();
    for (let i = 0; i < imgFile.length; i++) {
      formData.append("imgFile", imgFile[i].file);
      formData.append("imgFileName", imgFile[i].name);
    }
    formData.append("userId", id);
    formData.append("areaId", areaId.toString());
    formData.append("textValue", textValue);
    formData.append("rating", rating.toString());
    formData.append("areaName", areaName);

    try {
      const response = await api.review.addReview(formData);
      onClose();
      return response.data;
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 bg-black${
        isOpening || isClosing ? "transition-opacity duration-300" : ""
      } ${isOpening ? "bg-opacity-0" : "bg-opacity-50"}`}
      onClick={handleClose}
    >
      <form
        ref={formRef}
        className={`absolute bottom-0 left-0 w-full h-auto py-4 pb-8 px-4 flex flex-col gap-3 rounded-t-3xl shadow-bottom-sheet bg-white transform${
          isClosing
            ? "translate-y-full"
            : isOpening
              ? "translate-y-full"
              : "translate-y-0"
        }transition-transform duration-300`}
      >
        <ReviewBottomSheetTitle />
        <ReviewBottomSheetRating
          rating={rating}
          handleRatingClick={handleRatingClick}
        />

        <ReviewBottomSheetInput
          textValue={textValue}
          setTextValue={setTextValue}
        />
        <ReviewBottomSheetImages imgFile={imgFile} setImgFile={setImgFile} />
        <button
          className="w-full h-10 mt-2 text-center border border-gray-600 rounded-lg"
          type="button"
          onClick={handleAdd}
        >
          작성 완료
        </button>
      </form>
    </div>
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
