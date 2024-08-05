import { getIconPath } from "@/components/commons/Icon/getIconPath";
import ImageFrame from "@/components/Frame/ImageFrame";
import { ICON } from "@/constants/icon";
import { PlanInsertType } from "@/types/plan";
import { DateUtil } from "@/utils/DateUtil";
import { useMemo } from "react";
import Input from "./Input";

type MyPlanDefaultProps = {
  data: PlanInsertType;
  setData: (data: PlanInsertType) => void;
};

function NewPlanBase({ data: plan, setData }: MyPlanDefaultProps) {
  const icon: string = useMemo(() => getIconPath(ICON.add.person.black), []);

  const startDate: Date = plan.startDate
    ? new Date(plan.startDate)
    : new Date();
  const endDate: Date = plan.endDate ? new Date(plan.endDate) : new Date();
  const setTitle = (text: string) => {
    setData({ ...plan, title: text });
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
          placeholder="○○○님의 여행"
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
      {/* <div className="w-full h-96 bg-gray-200"> */}
      {/* TODO 캘린더로 여행 기간 설정할 수 있도록 */}
      {/* <h4 className="p-4">캘린더 영역 (여행 기간 설정)</h4> */}
      {/* </div> */}
      <div className="px-4 space-y-4">
        <label htmlFor="travel-mate" className="font-semibold">
          여행 메이트
        </label>
        <button className="px-4 py-1 flex justify-center items-center border  rounded-full border-black bg-gray-300 hover:brightness-105">
          {/* TODO 사람 추가하는 아이콘 추가 */}
          <ImageFrame src={icon} className="w-4 h-4 mr-2" />
          추가하기
        </button>
      </div>
    </div>
  );
}

export default NewPlanBase;
