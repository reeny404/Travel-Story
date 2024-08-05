"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CarIcon from "../_components/icons/CarIcon";
import CheckIcon from "../_components/icons/CheckIcon";
import ClipIcon from "../_components/icons/ClipIcon";
import FillLocationIcon from "../_components/icons/FillLocationIcon";
import FillMemoIcon from "../_components/icons/FillMemoIcon";
import TimeIcon from "../_components/icons/TimeIcon";

const colors = ["#E8F97B", "#4394ED", "#ED795A", "#29C273", "#AA82E2"];

// const transportIcons: Record<
//   string,
//   JSXElementConstructor<{ className: string }>
// > = {
//   도보: WalkingIcon,
//   자전거: BicycleIcon,
//   렌트카: CarIcon,
//   대중교통: PublicTransportIcon,
//   선박: ShipIcon,
//   항공: AirplaneIcon,
// } as const;

// type TransportType = keyof typeof transportIcons;

type CheckItemType = {
  text: string;
  isCheck: boolean;
};

function ScheduleList({
  planId,
  selectedDay,
}: {
  planId: string;
  selectedDay: number;
}) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get(`/api/plan/${planId}/schedule`, {
          params: { planId, day: selectedDay },
        });
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchScheduleData();
  }, [planId, selectedDay]);

  const handleCheckboxChange = async (
    itemId: string,
    checkIndex: number,
    isChecked: boolean
  ) => {
    try {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === itemId
            ? {
                ...item,
                data: {
                  ...item.data,
                  check: item.data.check?.map(
                    (checkItem: CheckItemType, index: number) =>
                      index === checkIndex
                        ? { ...checkItem, isCheck: !isChecked }
                        : checkItem
                  ),
                },
              }
            : item
        )
      );

      await axios.put(`/api/plan/${planId}/check`, {
        itemId,
        checkIndex,
        isChecked: !isChecked,
      });
    } catch (error) {
      console.error("Error updating check state:", error);
    }
  };

  const calculateDuration = (
    startTime: string | null,
    endTime: string | null
  ): string => {
    if (startTime && endTime) {
      const start = new Date(`2024-01-01T${startTime}`);
      const end = new Date(`2024-01-01T${endTime}`);
      const duration = Math.ceil((end.getTime() - start.getTime()) / 60000); // 분 단위로 계산
      return `${duration}분`;
    }
    return "";
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  let placeIndex = 0;

  return (
    <ul className="p-6 h-full">
      {data.map((item, index) => {
        const isLastItem = index === data.length - 1;
        let countText = "";
        let backgroundColor = "black";
        let colorIcon = "white";

        if (item.type === "customePlace" || item.type === "place") {
          countText = `${++placeIndex}`;
          backgroundColor = colors[(placeIndex - 1) % colors.length];
          colorIcon = backgroundColor;

          return (
            <li
              key={item.id}
              className="flex items-center justify-between min-h-44 h-full"
            >
              <div className="w-[10%] min-h-44 mr-[3%] flex flex-col h-full">
                <div
                  className="w-7 h-7 mx-auto text-white rounded-full flex items-center justify-center"
                  style={{ backgroundColor }}
                >
                  {countText}
                </div>
                {!isLastItem && (
                  <span className="w-[1px] flex-1 bg-gray-300 mx-auto block"></span>
                )}
              </div>
              <div className="w-[87%] min-h-44 h-auto">
                <div className="w-full flex items-center justify-between">
                  <div className="mb-2 h-6 flex items-center">
                    <FillLocationIcon
                      className="h-6 w-6 mr-2"
                      color={colorIcon}
                    />
                    <h3 className="text-base font-bold">{item.data.title}</h3>
                  </div>
                </div>
                <div className="w-full min-h-20 py-2 px-3 relative bg-white text-sm shadow-schecule-list rounded-lg">
                  {item.data.startTime && item.data.endTime && (
                    <div className="flex items-center h-5 justify-between mb-3">
                      <div className="flex items-center">
                        <TimeIcon className="mr-2" />
                        <p>
                          {formatTime(item.data.startTime)} -{" "}
                          {formatTime(item.data.endTime)}
                        </p>
                      </div>
                      <p className="pl-4 h-full text-sm text-[#828282] leading-5 ">
                        {calculateDuration(
                          item.data.startTime,
                          item.data.endTime
                        )}
                      </p>
                    </div>
                  )}
                  {item.data.memo && !item.data.startTime && (
                    <div className="flex items-center mb-3">
                      <FillMemoIcon className="mr-2" />
                      <p>{item.data.memo}</p>
                    </div>
                  )}
                  <div className="flex items-center mb-3">
                    <FillLocationIcon className="mr-2" />
                    <p>{item.data.place}</p>
                  </div>
                  <ClipIcon className="absolute right-4 bottom-4" />
                </div>
              </div>
            </li>
          );
        }

        if (item.type === "move") {
          // const TransportIcon = transportIcons[item.data.type as TransportType];
          return (
            <li key={item.id} className="flex flex-col w-full">
              <div className="flex items-center w-full h-10 rounded-l-3xl rounded-r-lg bg-[#3F3F3F]">
                <div className="w-[9%] mr-[3%] flex items-center justify-center">
                  <div className="w-7 h-7 bg-[#E8F97B] ml-1 text-white rounded-full flex items-center justify-center">
                    <CarIcon className="w-4 h-4" />
                    {/* TODO 아이콘 정상적오르 보이도록 */}
                  </div>
                </div>
                <div className="w-[87%] h-full leading-full flex items-center justify-between">
                  <div className="w-full h-full text-white text-sm leading-10">
                    {item.data.type}
                  </div>
                  <span className="pl-2 mr-1 h-5 text-sm text-[#EFEFEF] border-l border-[#EFEFEF] whitespace-nowrap">
                    {calculateDuration(item.data.startTime, item.data.endTime)}
                  </span>
                </div>
              </div>
              {!isLastItem && (
                <span className="ml-[5%] w-[1px] h-8 bg-gray-300 block"></span>
              )}
            </li>
          );
        }

        if (item.type === "memo") {
          return (
            <li
              key={item.id}
              className="flex items-center justify-between min-h-44 h-full"
            >
              <div className="w-[10%] min-h-44 mr-[3%] flex flex-col h-full">
                <div className="w-7 h-7 mx-auto bg-black text-white rounded-full flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
                {!isLastItem && (
                  <span className="w-[1px] flex-1 bg-gray-300 mx-auto block"></span>
                )}
              </div>

              <div className="w-[87%] min-h-44">
                <div className="w-full flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold">{item.data.title}</h3>
                </div>
                <div className="w-full min-h-20 h-auto py-2 px-4 bg-white text-sm shadow-schecule-list rounded-lg">
                  <div className="flex items-center h-full">
                    <ul className="w-full">
                      {item.data.check?.map(
                        (checkItem: CheckItemType, index: number) => (
                          <li
                            key={index}
                            className="flex items-center justify-between mb-2 h-10"
                          >
                            <p className="flex-grow">{checkItem.text}</p>
                            <span
                              className={`w-4 h-4 flex items-center justify-center rounded-full ${
                                checkItem.isCheck ? "bg-black" : "bg-[#C8C8C8]"
                              } cursor-pointer`}
                              onClick={() =>
                                handleCheckboxChange(
                                  item.id,
                                  index,
                                  checkItem.isCheck
                                )
                              }
                            >
                              <CheckIcon className="w-3 h-3 text-white" />
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
}

export default ScheduleList;
