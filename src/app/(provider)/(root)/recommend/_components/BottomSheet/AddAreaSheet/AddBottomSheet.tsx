"use client";
import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import AddBottomSheetTitle from "./AddBottomSheetTitle";
import PlanItem from "./PlanItem";

type BottomSheetProps = {
  onClose: () => void;
  areaId: number;
  id: string; // 추가
  areaName: string;
};

function AddBottomSheet({ onClose, areaId, id, areaName }: BottomSheetProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [clickedPlan, setClickedPlan] = useState<number | null>(null);
  const { user } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };
  const { data: planData } = useQuery({
    queryKey: ["planData", user?.id],
    queryFn: () => api.area.getPlan(user?.id!),
  });

  useEffect(() => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 300);
  }, []);

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
        <AddBottomSheetTitle areaId={areaId} />
        <section className="min-h-96">
          {planData &&
            planData.map((plan: any, idx: number) => {
              return (
                <PlanItem
                  setClickedPlan={setClickedPlan}
                  clickedPlan={clickedPlan}
                  key={idx}
                  plan={plan}
                  idx={idx}
                />
              );
            })}
        </section>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="h-10 text-center border border-gray-600 rounded-lg"
            type="button"
            onClick={() => onClose()}
          >
            취소
          </button>
          <button
            className="h-10 text-center border border-gray-600 rounded-lg"
            type="button"
            onClick={() => {}}
          >
            {planData ? "추가하기" : "내 여행 만들기"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function createAddBottomSheet() {
  return function AddBottomSheetWrapper({
    onClose,
    areaId,
    areaName,
    id,
    // 추가
  }: BottomSheetProps) {
    return (
      <AddBottomSheet
        areaName={areaName}
        onClose={onClose}
        areaId={areaId}
        id={id} // 전달
      />
    );
  };
}

export default AddBottomSheet;
