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

  let placeIndex: number = 0;

  return (
    <>
      <ul className="p-6 h-full">
        {scheduleList.map((item, index) => {
          const isLast = index === scheduleList.length - 1;
          const isSchedule =
            item.type === "customPlace" || item.type === "place";

          return (
            <li
              key={item.id}
              className="flex items-center justify-between min-h-44 h-full"
            >
              {isSchedule && (
                <Schedule
                  key={item.id}
                  index={++placeIndex}
                  schedule={item as SupabaseScheduleType}
                  isLast={isLast}
                  showMore={openBottomSheet}
                />
              )}
              {item.type === "move" && (
                <MoveSchedule
                  key={item.id}
                  moveSchedule={item as SupabaseMoveType}
                  isLast={isLast}
                />
              )}
              {item.type === "memo" && (
                <Memo
                  key={item.id}
                  memo={item as SupabaseMemoType}
                  isLast={isLast}
                  planId={planId}
                  day={selectedDay}
                />
              )}
            </li>
          );
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
