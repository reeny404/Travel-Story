"use client";
import PlanAPI from "@/apis/plan.api"; // 추가
import RatingIcons from "@/components/Card/RatingIcons";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReviewBottomSheetImages from "./ReviewBottomSheetImages";
import ReviewBottomSheetInput from "./ReviewBottomSheetInput";
import ReviewBottomSheetTitle from "./ReviewBottomSheetTitle";

type BottomSheetProps = {
  onClose: () => void;
  areaId: number;
  id?: string; // 추가
  rating: number;
};

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 환경 변수로 설정된 API URL 사용
  timeout: 1000,
});

const planAPI = new PlanAPI(apiClient);

function BottomSheet({ onClose, areaId, id, rating }: BottomSheetProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  useEffect(() => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 300);
  }, []);

  const getFormData = () => {
    const formData = new FormData(formRef.current!);
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
        <div className="w-full p-5 pt-4">
          <RatingIcons type="big" rating={rating} />
        </div>
        <ReviewBottomSheetInput />
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
    rating, // 추가
  }: BottomSheetProps) {
    return (
      <BottomSheet
        rating={rating}
        onClose={onClose}
        areaId={areaId}
        id={id} // 전달
      />
    );
  };
}

export default BottomSheet;
