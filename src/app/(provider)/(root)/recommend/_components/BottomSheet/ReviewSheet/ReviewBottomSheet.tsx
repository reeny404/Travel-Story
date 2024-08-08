"use client";
import { api } from "@/apis/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
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
const mockData = [
  { icon: `/icons/emoji-dinner.svg`, text: "음식이 맛있어요" },
  { icon: `/icons/emoji-dinner.svg`, text: "음식이 맛있어요" },
  { icon: `/icons/emoji-dinner.svg`, text: "음식이 맛있어요" },
  { icon: `/icons/emoji-dinner.svg`, text: "음식이 맛있어요" },
  { icon: `/icons/emoji-dinner.svg`, text: "음식이 맛있어요" },
  { icon: `/icons/emoji-dinner.svg`, text: "음식이 맛있어요" },
  { icon: `/icons/emoji-dinner.svg`, text: "음식이 맛있어요" },
  { icon: `/icons/emoji-dinner.svg`, text: "음식이 맛있어요" },
];
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
  const queryClient = useQueryClient();

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

  const { mutate: addReview } = useMutation({
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
      return data;
    },
  });

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
      addReview(formData);
    } catch (error) {
      console.error("Error adding data:", error);
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
              <ReviewBottomSheetImages
                imgFile={imgFile}
                setImgFile={setImgFile}
              />
            </div>
          </article>
          <article className="flex-grow mt-8 pt-10 px-5 bg-brand-100 flex flex-col items-center">
            <h1 className="text-xl font-bold leading-[22px] pb-8">
              어떤 점이 좋았나요?
            </h1>

            <div className="w-full overflow-x-auto flex gap-x-5 ">
              <div className="flex flex-col gap-y-3 flex-none ">
                <div className="px-5 py-[10px] bg-white rounded-lg flex items-center">
                  <Image
                    src="/icons/emoji-dinner.svg"
                    alt="image"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span className="pl-2 text-sm font-semibold leading-6">
                    음식이 맛있어요
                  </span>
                </div>
                <div className="px-5 py-[10px] bg-white rounded-lg flex items-center">
                  <Image
                    src="/icons/emoji-architect.svg"
                    alt="image"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span className="pl-2 text-sm font-semibold leading-6">
                    관광지와 가까워요
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-y-3 flex-none">
                <div className="px-5 py-[10px] bg-white rounded-lg flex items-center">
                  <Image
                    src="/icons/emoji-dinner.svg"
                    alt="image"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span className="pl-2 text-sm font-semibold leading-6">
                    음식이 맛있어요
                  </span>
                </div>
                <div className="px-5 py-[10px] bg-white rounded-lg flex items-center">
                  <Image
                    src="/icons/emoji-architect.svg"
                    alt="image"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span className="pl-2 text-sm font-semibold leading-6">
                    관광지와 가까워요
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-y-3 flex-none">
                <div className="px-5 py-[10px] bg-white rounded-lg flex items-center">
                  <Image
                    src="/icons/emoji-dinner.svg"
                    alt="image"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span className="pl-2 text-sm font-semibold leading-6">
                    음식이 맛있어요
                  </span>
                </div>
                <div className="px-5 py-[10px] bg-white rounded-lg flex items-center">
                  <Image
                    src="/icons/emoji-architect.svg"
                    alt="image"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span className="pl-2 text-sm font-semibold leading-6">
                    관광지와 가까워요
                  </span>
                </div>
              </div>
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
              onClick={handleAdd}
            >
              {textValue.length === 0 ? "작성을 완료해주세요" : "리뷰 등록하기"}
            </button>
          </div>
        </section>
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
