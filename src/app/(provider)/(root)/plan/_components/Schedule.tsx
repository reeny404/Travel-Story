import SvgIcon from "@/components/commons/SvgIcon";
import {
  BottomSheetType,
  PlanChildType,
  SupabaseScheduleType,
  SupbasePlanChildren,
} from "@/types/plan";
import { PlanUtil } from "@/utils/PlanUtil";
import { getColorChip } from "./Color";
import ClipIcon from "./icons/ClipIcon";
import FillLocationIcon from "./icons/FillLocationIcon";

type Props = {
  index: number;
  schedule: SupabaseScheduleType;
  isLast: boolean;
  showMore: (
    item: SupbasePlanChildren,
    type: PlanChildType,
    status: BottomSheetType["status"]
  ) => void;
};

function Schedule({ index, schedule, isLast, showMore }: Props) {
  const color = getColorChip(index - 1);

  const { title, startTime, endTime, memo, place, imagesUrl } = schedule.data;

  return (
    <>
      <div className="w-7 mr-[3%] grid grid-flow-row grid-rows-schedule">
        <div
          className="w-7 h-7 mx-auto text-white rounded-full flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          {index}
        </div>
        {!isLast && <div className="w-[1px] bg-gray-300 mx-auto my-0" />}
      </div>
      <div className="flex-1 ml-3 pb-8">
        <div
          className="h-6 w-full mb-2 flex items-center justify-between cursor-pointer"
          onClick={() => showMore(schedule, schedule.type, "read")}
        >
          <h3 className="flex text-base font-bold">
            <FillLocationIcon className="h-6 w-6 mr-2" color={color} />
            <span>{title}</span>
          </h3>
          <button>*</button>
        </div>
        <div className="w-full p-3 bg-white text-sm shadow-default rounded-lg space-y-3 leading-5">
          {startTime && endTime && (
            <div className="flex items-center justify-between">
              <div className="grid grid-flow-col space-x-2">
                <SvgIcon name="time" width={20} height={20} color="gray-400" />
                <span>
                  {`${PlanUtil.formatTime(startTime)} - ${PlanUtil.formatTime(endTime)}`}
                </span>
              </div>
              <p className="text-sm text-[#828282] leading-5 ">
                {PlanUtil.calculateDuration(startTime, endTime)}
              </p>
            </div>
          )}
          {memo && (
            <div className="grid grid-flow-col space-x-2">
              <SvgIcon name="memo" width={20} height={20} color="gray-400" />
              <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                {memo}
              </span>
            </div>
          )}
          {place && (
            <div className="grid grid-flow-col space-x-2">
              <SvgIcon
                name="location"
                className="w-6 h-6 relative -left-0.5"
                color="gray-400"
              />
              <span>{place}</span>
            </div>
          )}
          <div className="w-full flex justify-end">
            {imagesUrl && <ClipIcon className="right-4 bottom-4" />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Schedule;
