"use client";
import SvgIcon from "@/components/commons/SvgIcon";
import { PlanInsertType } from "@/types/plan";
import { DateUtil } from "@/utils/DateUtil";
import { useEffect, useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

type NewPlanCalenderProps = {
  data: PlanInsertType;
  set: (plan: PlanInsertType) => void;
};
type ValuePiece = Date;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function NewPlanCalender({ data: plan, set }: NewPlanCalenderProps) {
  const [value, setValue] = useState<Value>([new Date(), new Date()]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && Array.isArray(value)) {
      set({
        ...plan,
        startDate: DateUtil.format("yyyy-MM-dd", value[0]),
        endDate: DateUtil.format("yyyy-MM-dd", value[1]),
      });
    }
  }, [value, isClient]);

  const handleChange: CalendarProps["onChange"] = (value) => {
    setValue(value as Value);
  };

  return (
    <div className="flex justify-center">
      {isClient && (
        <Calendar
          onChange={handleChange}
          value={value}
          selectRange={true}
          formatDay={(locale, date) => `${date.getDate()}`}
          next2Label={null}
          prev2Label={null}
          nextLabel={
            <SvgIcon
              name="angle-right-calendar"
              width={20}
              height={20}
              title="angle"
              color="neutral-400"
              hasStroke={true}
            />
          }
          prevLabel={
            <SvgIcon
              name="angle-left"
              width={20}
              height={20}
              title="angle"
              color="neutral-400"
              hasStroke={true}
            />
          }
        />
      )}
    </div>
  );
}

export default NewPlanCalender;
