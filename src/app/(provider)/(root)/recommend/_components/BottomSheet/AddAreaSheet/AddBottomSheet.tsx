"use client";
import { api } from "@/apis/api";
import { getInsertData } from "@/app/(provider)/(root)/plan/_components/getInsertData";
import { useAuth } from "@/contexts/auth.contexts";
import useScheduleStore from "@/stores/schedule.store";
import { Area } from "@/types/Recommend";
import { Schedule } from "@/types/plan";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BottomSheet } from "../BottomSheet";
import AddBottomSheetTitle from "./AddBottomSheetTitle";
import PlanItem from "./PlanItem";

type BottomSheetProps = {
  onClose: () => void;
  area: Area;
};

function AddBottomSheet({ onClose, area }: BottomSheetProps) {
  const { createSchedule } = useScheduleStore();
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
      alert("여행 일정을 선택해주세요");
      return;
    }
    const data = planData[clickedPlan!];
    const planId: string = data?.id;
    if (!planId) {
      alert("새로고침 후 재시도해주세요");
      return;
    }

    const scheduleData: Schedule = {
      planId: planId,
      areaId: area?.id,
      title: area?.krName!,
      place: "",
      memo: "",
      imagesUrl: [],
      type: "place",
      latlng: { lat: area.lat!, lng: area.lng! },
    };
    const insertData = getInsertData("customPlace", scheduleData, planId);
    if (!insertData) {
      alert("새로고침 후 재시도 해주세요");
      return;
    }
    await createSchedule(planId, day ?? 1, "customPlace", insertData);
    setDay(null);
    onClose();
    router.push(`/plan/${planId}`);
  };

  useEffect(() => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 300);
  }, []);

  return (
    <BottomSheet onClose={onClose} height="472px">
      <AddBottomSheetTitle areaId={area?.id} isPlan={planData ? true : false} />
      <section className="no-scroll h-[328px] flex flex-col pt-4 gap-y-4 overflow-scroll">
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
      <div className="grid grid-cols-2 gap-3 pb-1">
        <button
          className="h-10 text-center border-[0.6px] border-neutral-600 text-neutral-750 rounded-lg"
          type="button"
          onClick={() => onClose()}
        >
          {!planData ? "계속 둘러보기" : "취소"}
        </button>
        {!planData ? (
          <button
            className="h-10 text-center bg-neutral-750 text-white rounded-lg"
            type="button"
            onClick={() => {
              router.push("/plan");
            }}
          >
            내 여행 만들기
          </button>
        ) : (
          <button
            className={`h-10 text-center rounded-lg ${!day ? "bg-neutral-300 text-neutral-550" : "bg-neutral-750 text-white"}`}
            type="button"
            disabled={!day}
            onClick={() => {
              handleAdd();
            }}
          >
            추가하기
          </button>
        )}
      </div>
    </BottomSheet>
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
