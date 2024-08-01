"use client";
import { api } from "@/apis/api";
import PlanAPI from "@/apis/plan.api"; // 추가
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReviewBottomSheetImages from "./ReviewBottomSheetImages";
import ReviewBottomSheetInput from "./ReviewBottomSheetInput";
import ReviewBottomSheetRating from "./ReviewBottomSheetRating";
import ReviewBottomSheetTitle from "./ReviewBottomSheetTitle";

type BottomSheetProps = {
  onClose: () => void;
  areaId: number;
  id: string; // 추가
  areaName: string;
};

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 환경 변수로 설정된 API URL 사용
  timeout: 1000,
});

const planAPI = new PlanAPI(apiClient);

function BottomSheet({ onClose, areaId, id, areaName }: BottomSheetProps) {
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

  // const getFormData = () => {
  //   const formData = new FormData(formRef.current!);
  //   const data: Record<string, any> = {};
  //   formData.forEach((value, key) => {
  //     data[key] = value;
  //   });
  //   return data;
  // };

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
      className={`fixed top-0 left-0 w-full h-full z-50 ${
        isOpening || isClosing ? "transition-opacity duration-300" : ""
      } ${isOpening ? "bg-opacity-0" : "bg-opacity-50"} bg-black`}
      onClick={handleClose}
    >
      <form
        ref={formRef}
        className={`absolute bottom-0 left-0 w-full h-auto py-4 pb-8 px-4 flex flex-col gap-3 rounded-t-3xl shadow-bottom-sheet bg-white transform ${
          isClosing
            ? "translate-y-full"
            : isOpening
              ? "translate-y-full"
              : "translate-y-0"
        } transition-transform duration-300`}
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
  return function BottomSheetWrapper({
    onClose,
    areaId,
    areaName,
    id,
    // 추가
  }: BottomSheetProps) {
    return (
      <BottomSheet
        areaName={areaName}
        onClose={onClose}
        areaId={areaId}
        id={id} // 전달
      />
    );
  };
}

export default BottomSheet;
