"use client";

import { useEffect, useState } from "react";
import LocationIcon from "./icons/LocationIcon";
import MemoIcon from "./icons/MemoIcon";
import SpendIcon from "./icons/SpendIcon";
import TimeIcon from "./icons/TimeIcon";

type BottomSheetInputType = {
  isDisabled?: boolean;
  value?: string;
  type: "memo" | "spend" | "place" | "time";
  startTime?: string;
  endTime?: string;
};

export default function BottomSheetInput({
  isDisabled = false,
  value = "",
  type,
  startTime = "",
  endTime = "",
}: BottomSheetInputType) {
  const [inputValue, setInputValue] = useState(value);
  const [inputStartTime, setInputStartTime] = useState(startTime);
  const [inputEndTime, setInputEndTime] = useState(endTime);
  const [placeholder, setPlaceholder] = useState("");
  const [IconComponent, setIconComponent] = useState<React.FC<{
    className?: string;
  }> | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setInputStartTime(startTime);
  }, [startTime]);

  useEffect(() => {
    setInputEndTime(endTime);
  }, [endTime]);

  useEffect(() => {
    switch (type) {
      case "memo":
        setPlaceholder("메모하기");
        setIconComponent(() => MemoIcon);
        break;
      case "spend":
        setPlaceholder("지출한 비용");
        setIconComponent(() => SpendIcon);
        break;
      case "place":
        setPlaceholder("위치 추가하기");
        setIconComponent(() => LocationIcon);
        break;
      case "time":
        setPlaceholder("시간 선택");
        setIconComponent(() => TimeIcon);
        break;
      default:
        setPlaceholder("");
        setIconComponent(null);
    }
  }, [type]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStartTime = event.target.value;
    if (newStartTime > inputEndTime && inputEndTime !== "") {
      alert("시작 시간은 종료 시간보다 늦을 수 없습니다.");
      return;
    }
    setInputStartTime(newStartTime);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = event.target.value;
    if (newEndTime < inputStartTime && inputStartTime !== "") {
      alert("종료 시간은 시작 시간보다 이를 수 없습니다.");
      return;
    }
    setInputEndTime(newEndTime);
  };

  const calculateDuration = () => {
    if (inputStartTime && inputEndTime) {
      const start = new Date(`2024-01-01T${inputStartTime}:00`);
      const end = new Date(`2024-01-01T${inputEndTime}:00`);
      const duration = (end.getTime() - start.getTime()) / 60000; // 분 단위로 계산
      return `${duration} 분`;
    }
    return "";
  };

  if (type === "time") {
    return (
      <div className="flex items-center">
        {IconComponent && <IconComponent className="mr-2 w-8 text-center" />}
        <input
          className="outline-0 w-22 border-[1px] text-sm border-gray appearance-none"
          type="time"
          name="startTime"
          value={inputStartTime}
          disabled={isDisabled}
          onChange={handleStartTimeChange}
          placeholder={placeholder}
        />
        <p className="m-3">-</p>
        <input
          className="outline-0 w-22 border-[1px] text-center text-sm border-gray appearance-none"
          type="time"
          name="endTime"
          value={inputEndTime}
          disabled={isDisabled}
          onChange={handleEndTimeChange}
          placeholder={placeholder}
        />
        <p className="pl-3 ml-2 border-l-[1px] border-gray-300">
          {calculateDuration()}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {IconComponent && <IconComponent className="mr-2 w-8 text-center" />}
      <input
        className="border-0 outline-0 w-[90%] border-b-[1px] text-sm border-white"
        type={type === "spend" ? "number" : "text"}
        name={type}
        value={inputValue}
        disabled={isDisabled}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}
