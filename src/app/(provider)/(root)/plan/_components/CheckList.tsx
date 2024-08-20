"use client";

import useScheduleStore from "@/stores/schedule.store";
import { Todo } from "@/types/plan";
import clsx from "clsx";
import CheckIcon from "./icons/CheckIcon";

type Props = {
  planId: string;
  day: number;
  memoId: string;
  checkList: Todo[];
};

function CheckList({ memoId, checkList, planId, day }: Props) {
  const { updateScheduleCheck } = useScheduleStore();

  const toggleCheckbox = async (index: number, isChecked: boolean) => {
    try {
      updateScheduleCheck(planId, day, memoId, index, isChecked);
    } catch (error) {
      console.error("체크 상태 업데이트 중 오류 발생:", error);
    }
  };

  return (
    <ul className="w-full">
      {checkList?.map((check: Todo, i: number) => (
        <li
          key={i}
          className="flex items-center justify-between space-x-2 mb-2 h-10"
        >
          <p className="flex-grow ">{check.text}</p>
          <span
            className={clsx(
              "w-4 h-4 flex items-center justify-center rounded-full cursor-pointer",
              check.isCheck ? "bg-black" : "bg-[#C8C8C8]"
            )}
            onClick={() => toggleCheckbox(i, check.isCheck)}
          >
            <CheckIcon className="w-3 h-3 text-white" />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default CheckList;
