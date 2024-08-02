import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";

type DateListProps = {
  setDay?: Dispatch<SetStateAction<number | null>>;
  days: number;
};

function DateList({ days, setDay }: DateListProps) {
  const [ClickedIdx, setClickedIdx] = useState<number | null>(null);
  const makeDateList = (days: number) => {
    const dateList = [];
    if (!days) {
      return;
    }
    for (let i = 1; i <= days; i++) {
      dateList.push(
        <div
          key={i}
          className={clsx("w-16 p-2 m-2 text-center rounded-lg", {
            "bg-black text-white": i === ClickedIdx,
          })}
          onClick={() => {
            setClickedIdx(i);
            setDay?.(i);
          }}
        >
          {i}일차
        </div>
      );
    }
    return <div className="flex flex-wrap w-full">{dateList}</div>;
  };
  return makeDateList(days);
}

export default DateList;
