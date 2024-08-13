import { SupabaseMoveType } from "@/types/plan";
import { PlanUtil } from "@/utils/PlanUtil";

type Props = {
  moveSchedule: SupabaseMoveType;
  isLast: boolean;
};

function MoveSchedule({ moveSchedule, isLast }: Props) {
  // const TransportIcon = transportIcons[item.data.type as TransportType];

  return (
    <li className="flex flex-col w-full">
      <div className="flex items-center w-full h-10 rounded-l-3xl rounded-r-lg bg-[#3F3F3F]">
        <div className="w-[9%] mr-[3%] flex items-center justify-center">
          <div className="w-7 h-7 bg-[#E8F97B] ml-1 text-white rounded-full flex items-center justify-center">
            {/* <TransportIcon className="w-4 h-4" /> */}
          </div>
        </div>
        <div className="w-[87%] h-full leading-full flex items-center justify-between">
          <div className="w-full h-full text-white text-sm leading-10">
            {moveSchedule.data.type}
          </div>
          <span className="pl-2 mr-1 h-5 text-sm text-[#EFEFEF] border-l border-[#EFEFEF] whitespace-nowrap">
            {PlanUtil.calculateDuration(
              moveSchedule.data.startTime,
              moveSchedule.data.endTime
            )}
          </span>
        </div>
      </div>
      {!isLast && (
        <span className="ml-[5%] w-[1px] h-8 bg-gray-300 block"></span>
      )}
    </li>
  );
}

export default MoveSchedule;
