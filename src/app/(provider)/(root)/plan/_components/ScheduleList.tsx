"use client";

import useScheduleStore from "@/stores/schedule.store";
import {
  BottomSheetType,
  PlanChildType,
  SupabaseMemoType,
  SupabaseMoveType,
  SupabaseScheduleType,
  SupbasePlanChildren,
} from "@/types/plan";
import { useEffect, useState } from "react";
import BottomSheet from "./BottomSheet";
import Memo from "./Memo";
import MoveSchedule from "./MoveSchedule";
import Schedule from "./Schedule";

type ScheduleListProps = {
  planId: string;
  selectedDay: number;
};

function ScheduleList({ planId, selectedDay }: ScheduleListProps) {
  const { planChildren: scheduleList, fetchSchedule: fetchScheduleList } =
    useScheduleStore();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SupbasePlanChildren>();
  const [type, setType] = useState<PlanChildType>("place"); // Default type
  const [status, setStatus] = useState<BottomSheetType["status"]>("read");

  useEffect(() => {
    fetchScheduleList(planId, selectedDay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId, selectedDay]);

  const openBottomSheet = (
    item: SupbasePlanChildren,
    type: PlanChildType,
    status: BottomSheetType["status"]
  ) => {
    setSelectedItem(item);
    setType(type);
    setStatus(status);
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedItem(undefined);
  };

  return (
    <>
      <ul className="p-6 h-full">
        {scheduleList.map((item, index) => {
          let placeIndex: number = 0;
          const isLast = index === scheduleList.length - 1;

          if (item.type === "customPlace" || item.type === "place") {
            const schedule: SupabaseScheduleType = item as SupabaseScheduleType;
            return (
              <Schedule
                key={item.id}
                index={placeIndex}
                schedule={schedule}
                isLast={isLast}
              />
            );
          }

          if (item.type === "move") {
            const move: SupabaseMoveType = item as SupabaseMoveType;
            return (
              <MoveSchedule key={item.id} moveSchedule={move} isLast={isLast} />
            );
          }

          if (item.type === "memo") {
            const memo: SupabaseMemoType = item as SupabaseMemoType;
            return (
              <Memo
                key={memo.id}
                memo={memo}
                isLast={isLast}
                planId={planId}
                day={selectedDay}
              />
            );
          }
        })}
      </ul>
      {isBottomSheetOpen && selectedItem && (
        <BottomSheet
          item={selectedItem}
          type={type}
          day={selectedDay}
          planId={planId}
          status={status}
          onClose={closeBottomSheet}
        />
      )}
    </>
  );
}

export default ScheduleList;
