"use client";
import PlanAPI from "@/apis/plan.api"; // 추가
import { ICON } from "@/constants/Icon";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReviewBottomSheetImages from "./ReviewBottomSheetImages";
import ReviewBottomSheetInput from "./ReviewBottomSheetInput";
import ReviewBottomSheetTitle from "./ReviewBottomSheetTitle";

type BottomSheetProps = {
  onClose: () => void;
  areaId: number;
  id?: string; // 추가
};

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 환경 변수로 설정된 API URL 사용
  timeout: 1000,
});

const planAPI = new PlanAPI(apiClient);

function BottomSheet({ onClose, areaId, id }: BottomSheetProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [images, setImages] = useState<string[]>([]);
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

  const getFormData = () => {
    const formData = new FormData(formRef.current!);
    console.log("formData", formData);
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    return data;
  };

  const handleAdd = async () => {
    const data = getFormData();
    data.images = JSON.stringify(images);
    data.areaId = areaId;
    data.textValue = textValue;
    data.rating = rating;

    console.log(data);
    // try {
    //   const response = await planAPI.addPlan(areaId, data); // PlanAPI 사용

    //   if (!response) {
    //     console.error("Error adding data");
    //     return;
    //   }

    //   console.log("데이터 추가됨", response);
    // } catch (error) {
    //   console.error("Error adding data:", error);
    // }
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
        <div className="w-full flex justify-center p-5 pt-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Image
              key={`filled-${idx}`}
              src={
                rating <= idx
                  ? `/icons/${ICON.star.unfill}.png`
                  : `/icons/${ICON.star.fill}.png`
              }
              alt="filled star"
              width={30}
              height={30}
              onClick={() => handleRatingClick(rating, idx + 1)}
              className={"object-contain mr-1"}
            />
          ))}
        </div>
        <ReviewBottomSheetInput
          textValue={textValue}
          setTextValue={setTextValue}
        />
        <ReviewBottomSheetImages images={images} setImages={setImages} />
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
    id,
    // 추가
  }: BottomSheetProps) {
    return (
      <BottomSheet
        onClose={onClose}
        areaId={areaId}
        id={id} // 전달
      />
    );
  };
}

export default BottomSheet;
