import { DateUtil } from "@/utils/DateUtil";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import DateList from "./DateList";

type PlanItemProps = {
  plan: any;
  clickedPlan: number | null;
  setClickedPlan: Dispatch<SetStateAction<number | null>>;
  setDay: Dispatch<SetStateAction<number | null>>;
  idx: number;
};

function PlanItem({
  plan,
  idx,
  setClickedPlan,
  clickedPlan,
  setDay,
}: PlanItemProps) {
  const days =
    DateUtil.getGapDay(new Date(plan.startDate), new Date(plan.endDate)) + 1;
  return (
    <div
      onClick={() => {
        clickedPlan === idx ? setClickedPlan(null) : setClickedPlan(idx);
      }}
      className={clsx("w-full p-4 shadow-area-section rounded-lg", {
        "border-brand-600 border-2": clickedPlan === idx,
      })}
    >
      <h1 className="font-bold">{plan.title}</h1>
      <p className="text-xs text-neutral-550">
        {plan.startDate} ~ {plan.endDate.slice(5)}
      </p>
      <div className={clsx("w-full mt-4", { hidden: clickedPlan !== idx })}>
        <DateList setDay={setDay} days={days} startDate={plan.startDate} />
      </div>
    </div>
  );
}

export default PlanItem;
