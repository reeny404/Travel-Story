"use client";
import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { Area } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AddBottomSheetTitle from "./AddBottomSheetTitle";
import PlanItem from "./PlanItem";

type BottomSheetProps = {
  onClose: () => void;
  area: Area;
};

function AddBottomSheet({ onClose, area }: BottomSheetProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [clickedPlan, setClickedPlan] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const { user, isLoggedIn } = useAuth();

  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

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


  const handleAdd = async () => {
    if (clickedPlan !== 0 && (!clickedPlan || !day)) {
      return console.log("여행 일정을 선택해주세요");
    }
    const data = planData[clickedPlan!];
    const scheduleData = {
      planId: data.id,
      userId: data.userId,
      areaId: area.id,
      orderList: data.orderList,
      krName: area.krName,
      day: day,
      type: "customePlace",
      latlng: { lat: area.lat, lng: area.lng },
    };
    await api.area.addSchedule(scheduleData);
    setDay(null);
    onClose();
  };
  useEffect(() => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 300);
  }, []);

  if (!planData) {
    return;
  }

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
        <AddBottomSheetTitle areaId={area?.id} />
        <section className="min-h-96">
          {planData &&
            planData.map((plan: any, idx: number) => {
              return (
                <PlanItem
                  setDay={setDay}
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

            {!planData ? "계속 둘러보기" : "취소"}

          </button>
          <button
            className="h-10 text-center border border-gray-600 rounded-lg"
            type="button"
            onClick={() => {
              !planData ? router.push("/plan") : handleAdd();
            }}
          >
            {!planData ? "내 여행 만들기" : "추가하기"}

          </button>
        </div>
      </form>
    </div>
  );
}

export function createAddBottomSheet() {
  return function AddBottomSheetWrapper({
    onClose,
    area,
    // 추가
  }: BottomSheetProps) {
    return (
      <AddBottomSheet
        onClose={onClose}
        area={area}
        // 전달
      />
    );
  };
}

export default AddBottomSheet;
