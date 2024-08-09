import adjustDate from "@/utils/adjustDate";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";

type DateListProps = {
  setDay: Dispatch<SetStateAction<number | null>>;
  days: number;
  startDate: string;
};

function DateList({ days, setDay, startDate }: DateListProps) {
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);
  const makeDateList = (days: number) => {
    const dateList = [];
    if (!days) {
      return;
    }
    for (let i = 1; i <= days; i++) {
      dateList.push(
        <div
          key={i}
          className={clsx(
            "w-[67px] h-12 bg-neutral-100 flex flex-col justify-center text-center rounded-lg",
            {
              "bg-neutral-650 text-white": i === clickedIdx,
            }
          )}
          onClick={() => {
            clickedIdx === i
              ? (setDay(null), setClickedIdx(null))
              : (setDay(i), setClickedIdx(i));
          }}
        >
          <p className="text-sm font-semibold">{i}일차</p>
          <p className="text-xs">{adjustDate(startDate, i - 1)}</p>
        </div>
      );
    }
    return (
      <div className="flex flex-wrap w-full gap-x-[10px] gap-y-[10px]">
        {dateList}
      </div>
    );
  };
  return makeDateList(days);
}

export default DateList;
