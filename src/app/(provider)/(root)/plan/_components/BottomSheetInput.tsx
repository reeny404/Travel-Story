"use client";

import { useEffect, useState } from "react";

type BottomSheetInputType = {
  isDisabled?: boolean;
  value?: string;
  type: "memo" | "spend" | "place";
};

export default function BottomSheetInput({
  isDisabled = false,
  value = "",
  type,
}: BottomSheetInputType) {
  const [inputValue, setInputValue] = useState(value);
  const [placeholder, setPlaceholder] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    switch (type) {
      case "memo":
        setPlaceholder("메모하기");
        setIcon("📝"); // 예시 메모 아이콘
        break;
      case "spend":
        setPlaceholder("지출한 비용");
        setIcon("💸"); // 예시 지출 아이콘
        break;
      case "place":
        setPlaceholder("위치 추가하기");
        setIcon("📍"); // 예시 위치 아이콘
        break;
      default:
        setPlaceholder("");
        setIcon("❓"); // 예시 기본 아이콘
    }
  }, [type]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex items-center">
      <i className="mr-2 w-8 text-center">{icon}</i>
      <input
        className="border-0 outline-0 w-[90%] border-b-[1px] border-white transition-colors focus:border-blue-300"
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
