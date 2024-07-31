import { DateUtil } from "@/utils/DateUtil";
import { useState } from "react";
import DateList from "./DateList";

function PlanItem({ plan }: { plan: any }) {
  const [isClicked, setIsClicked] = useState(false);
  const days =
    DateUtil.getGapDay(new Date(plan.startDate), new Date(plan.endDate)) + 1;
  return (
    <div
      onClick={() => setIsClicked(!isClicked)}
      className="w-full min-h-24 m-2 p-2 border border-blue-400 border-2 rounded-lg"
    >
      <h1 className="font-bold mb-1">{plan.title}</h1>
      <p className="text-xs">
        {plan.startDate} ~ {plan.endDate.slice(5)}
      </p>
      {isClicked && <DateList days={days} />}
    </div>
  );
}

export default PlanItem;
