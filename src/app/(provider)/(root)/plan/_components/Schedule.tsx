import { SupabaseScheduleType } from "@/types/plan";
import { PlanUtil } from "@/utils/PlanUtil";
import { getColorChip } from "./Color";
import ClipIcon from "./icons/ClipIcon";
import FillLocationIcon from "./icons/FillLocationIcon";
import FillMemoIcon from "./icons/FillMemoIcon";
import TimeIcon from "./icons/TimeIcon";

type Props = {
  index: number;
  schedule: SupabaseScheduleType;
  isLast: boolean;
};

function Schedule({ index, schedule, isLast }: Props) {
  const countText = `${++index}`;
  const backgroundColor = getColorChip(index - 1);
  const colorIcon = backgroundColor;
  return (
    <li
      key={schedule.id}
      className="flex items-center justify-between min-h-44 h-full"
    >
      <div className="w-[10%] min-h-44 mr-[3%] flex flex-col h-full">
        <div
          className="w-7 h-7 mx-auto text-white rounded-full flex items-center justify-center"
          style={{ backgroundColor }}
        >
          {countText}
        </div>

        {!isLast && (
          <span className="w-[1px] flex-1 bg-gray-300 mx-auto block"></span>
        )}
      </div>
      <div className="w-[87%] min-h-44 h-auto">
        <div className="w-full flex items-center justify-between">
          <div className="mb-2 h-6 flex items-center">
            <FillLocationIcon className="h-6 w-6 mr-2" color={colorIcon} />
            <h3 className="text-base font-bold">{schedule.data.title}</h3>
          </div>
          {/* <button
                      onClick={() =>
                        openBottomSheet(
                          item,
                          item.type as
                            | "customPlace"
                            | "place"
                            | "move"
                            | "memo",
                          "read"
                        )
                      }
                    >
                      read바텀시트
                    </button> */}
        </div>
        <div className="w-full min-h-20 py-2 px-3 relative bg-white text-sm shadow-schecule-list rounded-lg">
          {schedule.data.startTime && schedule.data.endTime && (
            <div className="flex items-center h-5 justify-between mb-3">
              <div className="flex items-center">
                <TimeIcon className="mr-2" />
                <p>
                  {PlanUtil.formatTime(schedule.data.startTime)} -{" "}
                  {PlanUtil.formatTime(schedule.data.endTime)}
                </p>
              </div>
              <p className="pl-4 h-full text-sm text-[#828282] leading-5 ">
                {PlanUtil.calculateDuration(
                  schedule.data.startTime,
                  schedule.data.endTime
                )}
              </p>
            </div>
          )}
          {schedule.data.memo && !schedule.data.startTime && (
            <div className="flex items-center mb-3">
              <FillMemoIcon className="mr-2" />
              <p>{schedule.data.memo}</p>
            </div>
          )}
          <div className="flex items-center mb-3">
            <FillLocationIcon className="mr-2" />
            <p>{schedule.data.place}</p>
          </div>
          <ClipIcon className="absolute right-4 bottom-4" />
        </div>
      </div>
    </li>
  );
}

export default Schedule;
