import { MoveType, SupabaseMoveType } from "@/types/plan";
import { PlanUtil } from "@/utils/PlanUtil";
import { MOVE_ICONS } from "./icons/MoveIcon";

type Props = {
  moveSchedule: SupabaseMoveType;
  isLast: boolean;
};

function MoveSchedule({ moveSchedule, isLast }: Props) {
  const { type, startTime, endTime } = moveSchedule.data;
  const TransportIcon = MOVE_ICONS[type as MoveType];

  return (
    <div className="w-full grid grid-flow-row grid-rows-move-schedule text-left relative -left-2.5">
      <div className="flex items-center w-full h-10 rounded-l-3xl rounded-r-lg bg-gray-650 pr-2">
        <div className="w-10 flex items-center justify-center">
          <div className="w-7 h-7 bg-olive-400 ml-1 text-white rounded-full flex items-center justify-center">
            <TransportIcon />
          </div>
        </div>
        <div className="flex-1 ml-3 h-full leading-full flex items-center justify-between">
          <div className="w-full h-full text-white text-sm leading-10">
            {type}
          </div>
          <span className="pl-2 mr-1 h-5 text-sm text-gray-200 whitespace-nowrap">
            {PlanUtil.calculateDuration(startTime, endTime)}
          </span>
        </div>
      </div>
      {!isLast && <div className="w-[1px] bg-gray-300 ml-6" />}
    </div>
  );
}

export default MoveSchedule;
