"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const colors = ["#E8F97B", "#4394ED", "#ED795A", "#29C273", "#AA82E2"];

type CheckItemType = {
  text: string;
  isCheck: boolean;
};

function ScheculeList({
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

  return (
    <ul className="p-6 h-full">
      {data.map((item, index) => {
        let countText = "";
        let backgroundColor = "black";
        let color = "white";

        if (item.type === "customePlace" || item.type === "place") {
          countText = `${index + 1}`; // 현재 인덱스를 카운터로 사용
          backgroundColor = colors[index % colors.length];
          color = backgroundColor;

          return (
            <li
              key={item.id}
              className="flex items-center justify-between h-full"
            >
              <div className="w-7 min-h-40 mr-[3%] h-full  relative">
                <div
                  className="absolute w-7 h-7 top-0 z-10 text-white rounded-full flex items-center justify-center"
                  style={{ backgroundColor }}
                >
                  {countText}
                </div>
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-300 w-[1px] h-full"></span>
              </div>
              <div className="w-[87%] min-h-40 pb-5">
                <div className="w-full h-12 flex items-center justify-between">
                  <div className="h-12 flex items-center">
                    <i className="mr-2" style={{ color }}>
                      장소
                    </i>
                    <h3 className="text-xl font-bold">{item.data.title}</h3>
                  </div>
                </div>
                <div className="w-full min-h-20 py-2 px-3 bg-white text-sm shadow-schecule-list rounded-lg">
                  {item.data.startTime && item.data.endTime && (
                    <div className="flex items-center h-5">
                      <div className="flex items-center">
                        <i className="mr-2">시간</i>
                        <p>
                          {formatTime(item.data.startTime)} -{" "}
                          {formatTime(item.data.endTime)}
                        </p>
                      </div>
                      <p className="pl-4 h-full m-5 text-sm text-[#828282]  leading-5 ">
                        {calculateDuration(
                          item.data.startTime,
                          item.data.endTime
                        )}
                      </p>
                    </div>
                  )}
                  {item.data.memo && (
                    <div className="flex items-center h-10">
                      <i className="mr-2">메모</i>
                      <p>{item.data.memo}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between h-10">
                    <div className="flex items-center h-10">
                      <i className="mr-2">위치</i>
                      <p>{item.data.place}</p>
                    </div>
                    <i className="mr-2">클립</i>
                  </div>
                </div>
              </div>
            </li>
          );
        }

        if (item.type === "move") {
          return (
            <li
              key={item.id}
              className="relative flex items-center w-full h-10 rounded-l-3xl  rounded-r-lg bg-[#3F3F3F] mb-6"
            >
              <div className="w-[9%] h-40 mr-[3%] relative">
                <div className="absolute top-1/2 left-1 transform -translate-y-1/2  w-[100%] aspect-[1/1] text-black rounded-full bg-[#E8F97B] flex items-center justify-center z-10">
                  버
                </div>
                <span className="absolute -z-10 top-0 left-1/2 transform -translate-x-1/2 bg-gray-300 w-[1px] h-full"></span>
              </div>
              <div className="w-[87%] h-full leading-full flex items-center justify-between">
                <div className="w-full h-full text-white text-sm leading-10">
                  {item.data.type}
                </div>
                <span className="pl-2 mr-1 h-5 text-sm text-[#828282] border-l  border-[#828282] whitespace-nowrap">
                  {calculateDuration(item.data.startTime, item.data.endTime)}
                </span>
              </div>
            </li>
          );
        }

        if (item.type === "memo") {
          return (
            <li key={item.id} className="flex items-center">
              <div className="w-[9%] min-h-40 mr-[3%] relative">
                <div
                  className="absolute top-0 z-10 w-[100%] aspect-[1/1] text-white rounded-full flex items-center justify-center"
                  style={{ backgroundColor }}
                >
                  {index + 1}
                </div>

                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-300 w-[1px] h-full"></span>
              </div>

              <div className="w-[87%] min-h-40 ">
                <div className="w-full h-12 flex items-center justify-between">
                  <div className="h-12 flex items-center">
                    <h3 className="text-xl font-bold">{item.data.title}</h3>
                  </div>
                </div>
                <div className="w-full min-h-20 py-2 px-3 bg-white text-sm shadow-schecule-list rounded-lg">
                  <div className="flex items-center h-10">
                    <i className="mr-2">메모</i>
                    <p>{item.data.memo}</p>
                  </div>
                  <div className="flex items-center h-10">
                    <ul className="w-full">
                      {item.data.check?.map(
                        (checkItem: CheckItemType, checkIndex: number) => (
                          <li
                            key={checkIndex}
                            className="flex items-center justify-between w-full"
                          >
                            <p>{checkItem.text}</p>

                            <input
                              type="checkbox"
                              checked={checkItem.isCheck}
                              readOnly
                              className="mr-2"
                            />
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

        return null; // 기본적으로 null 반환
      })}
    </ul>
  );
}

export default ScheculeList;
