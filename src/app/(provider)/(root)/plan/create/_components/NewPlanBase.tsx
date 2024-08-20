"use client";

import SvgIcon from "@/components/commons/SvgIcon";
import ImageFrame from "@/components/Frame/ImageFrame";
import { COUNTRY_LIST } from "@/constants/country";
import useCountryFilterStore from "@/stores/searchFilter.store";
import { PlanInsertType } from "@/types/plan";
import { DateUtil } from "@/utils/DateUtil";
import { useState } from "react";
import SearchFilter from "../../../search/_components/SearchFilter";
import Input from "./Input";
import NewPlanCalender from "./NewPlanCalender";

type MyPlanDefaultProps = {
  data: PlanInsertType;
  set: (plan: PlanInsertType) => void;
};

function NewPlanBase({ data: plan, set }: MyPlanDefaultProps) {
  const { countryFilter } = useCountryFilterStore();
  const [isFilterOpen, setIsFiterOpen] = useState<boolean>(false);
  const handleToggleFilter = (open: boolean) => () => setIsFiterOpen(open);

  const flagImg: string = COUNTRY_LIST.find(
    (country) => country.krName === countryFilter.name
  )?.imageUrl!;

  const startDate: Date = plan.startDate
    ? new Date(plan.startDate)
    : new Date();
  const endDate: Date = plan.endDate ? new Date(plan.endDate) : new Date();
  const setTitle = (text: string) => {
    set({
      ...plan,
      title: text,
      startDate: DateUtil.format("yyyy-MM-dd", startDate),
      endDate: DateUtil.format("yyyy-MM-dd", endDate),
    });
  };

  return (
    <div className="py-4 space-y-12">
      <div className="px-4 space-y-2 flex flex-col">
        <label htmlFor="travel-title" className="font-semibold">
          여행 제목
        </label>
        <Input
          autoFocus
          id="travel-title"
          placeholder="닉네임님의 여행"
          className="py-2 border-b outline-none"
          text={plan.title ?? ""}
          setText={setTitle}
        />
      </div>
      <div className="px-4 space-y-4">
        <label className="font-semibold">여행 기간</label>
        <div className="flex justify-between items-center">
          <span className="px-2 flex-1 text-center rounded hover:bg-gray-100">
            {DateUtil.format("yyyy년 MM월 dd일 (E)", startDate)}
          </span>
          <span>-</span>
          <span className="px-2 flex-1 text-center rounded hover:bg-gray-100">
            {DateUtil.format("yyyy년 MM월 dd일 (E)", endDate)}
          </span>
        </div>
      </div>
      <div className="w-full pb-5 pt-2">
        {/* TODO 캘린더로 여행 기간 설정할 수 있도록 */}
        <NewPlanCalender data={plan} set={set} />
      </div>
      <div className="px-4 space-y-4">
        <label htmlFor="travel-mate" className="font-semibold">
          여행지
        </label>
        <div className="flex items-center space-x-2">
          <button
            className="p-2.5 flex justify-center items-center hover:brightness-105"
            onClick={handleToggleFilter(true)}
          >
            <SvgIcon name="slider" width={16} height={16} title="filter" />
          </button>
          <div
            className="px-5 py-2 flex space-x-3 items-center border border-neutral-300 rounded-lg"
            onClick={handleToggleFilter(true)}
          >
            <ImageFrame src={flagImg} className="w-5 h-5" />
            <span>{countryFilter.name}</span>
          </div>
        </div>
      </div>
      {isFilterOpen && <SearchFilter onClose={handleToggleFilter(false)} />}
    </div>
  );
}

export default NewPlanBase;
