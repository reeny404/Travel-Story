import { DateUtil } from "@/utils/DateUtil";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import DateList from "./DateList";

type PlanItemProps = {
  plan: any;
  clickedPlan: number | null;
  setClickedPlan: Dispatch<SetStateAction<number | null>>;
  idx: number;
};

function PlanItem({ plan, idx, setClickedPlan, clickedPlan }: PlanItemProps) {
  const [isClicked, setIsClicked] = useState(false);
  const days =
    DateUtil.getGapDay(new Date(plan.startDate), new Date(plan.endDate)) + 1;
  return (
    <div
      onClick={() => {
        setClickedPlan(idx);
      }}
      className={clsx("w-full min-h-24 m-2 p-2", {
        "border border-blue-400 border-2 rounded-lg": clickedPlan === idx,
      })}
    >
      <h1 className="font-bold mb-1">{plan.title}</h1>
      <p className="text-xs">
        {plan.startDate} ~ {plan.endDate.slice(5)}
      </p>
      {clickedPlan === idx && <DateList days={days} />}
    </div>
  );
}

export default PlanItem;
