"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const colors = ["#E8F97B", "#4394ED", "#ED795A", "#29C273", "#AA82E2"];

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
      const duration = (end.getTime() - start.getTime()) / 60000; // 분 단위로 계산
      return `${duration} 분`;
    }
    return "";
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <ul className="bg-[#FCFCFC] p-6 h-full">
      {data.map((item, index) => {
        let countText = "";
        let backgroundColor = "black";
        let color = "white";

        if (item.type === "customePlace" || item.type === "place") {
          countText = `${index + 1}`; // 현재 인덱스를 카운터로 사용
          backgroundColor = colors[index % colors.length];
          color = backgroundColor;

          return (
            <li key={item.id} className="flex items-center ">
              <div className="w-[10%] min-h-40 mr-[3%] relative">
                <div
                  className="absolute top-0 z-10 w-[100%] aspect-[1/1] text-white rounded-full flex items-center justify-center"
                  style={{ backgroundColor }}
                >
                  {countText}
                </div>
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-300 w-[1px] h-full"></span>
              </div>
              <div className="w-[87%] min-h-40 ">
                <div className="w-full h-12 flex items-center justify-between">
                  <div className="h-12 flex items-center">
                    <i className="mr-2" style={{ color }}>
                      장소
                    </i>
                    <h3 className="text-xl font-bold">{item.data.title}</h3>
                  </div>
                </div>
                <div className="w-full min-h-20 py-2 px-3 bg-white text-sm shadow-schecule-list">
                  <div className="flex items-center h-10">
                    <i className="mr-2">메모</i>
                    <p>{item.data.memo}</p>
                  </div>
                  <div className="flex items-center h-5 justify-between">
                    <div className="flex items-center">
                      <i className="mr-2">시간</i>
                      <p>
                        {formatTime(item.data.startTime)} -{" "}
                        {formatTime(item.data.endTime)}
                      </p>
                    </div>
                    <span className="pl-4 h-full text-sm text-[#828282] border-l leading-5 border-[#828282]">
                      {calculateDuration(
                        item.data.startTime,
                        item.data.endTime
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        }

        if (item.type === "move") {
          return (
            <li key={item.id} className="flex items-center">
              <div className="w-[10%] min-h-40 mr-[3%] relative">
                <div
                  className="absolute top-0 z-10 w-[100%] aspect-[1/1] text-white rounded-full flex items-center justify-center"
                  style={{ backgroundColor }}
                >
                  {countText}
                </div>
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-300 w-[1px] h-full"></span>
              </div>

              <div className="w-[87%] min-h-40 ">
                <div className="w-full min-h-20 py-2 px-3 bg-white text-sm shadow-schecule-list">
                  <div className="flex items-center h-10">
                    <i className="mr-2">이동</i>
                  </div>
                </div>
              </div>
            </li>
          );
        }

        if (item.type === "memo") {
          return (
            <li key={item.id} className="flex items-center">
              <div className="w-[10%] min-h-40 mr-[3%] relative">
                <div
                  className="absolute top-0 z-10 w-[100%] aspect-[1/1] text-white rounded-full flex items-center justify-center"
                  style={{ backgroundColor }}
                >
                  {countText}
                </div>
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-300 w-[1px] h-full"></span>
              </div>

              <div className="w-[87%] min-h-40 ">
                <div className="w-full min-h-20 py-2 px-3 bg-white text-sm shadow-schecule-list">
                  <div className="flex items-center h-10">
                    <i className="mr-2">메모</i>
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