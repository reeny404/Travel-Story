"use client";
import { BottomSheetType } from "@/types/plan";
import React, { useEffect, useState } from "react";
import TransportOption from "./TransportOption";

function BottomSheetTitle({ type, status }: BottomSheetType) {
  const [inpTitleValue, setTitleValue] = useState("");
  const [titlePlaceholder, setTitlePlaceholder] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  const handleMoveTitleChange = (label: string) => {
    setTitleValue(label);
  };

  useEffect(() => {
    switch (type) {
      case "memo":
        setTitlePlaceholder("메모하기");
        break;
      case "spend":
        setTitlePlaceholder("지출한 비용");
        break;
      case "place":
        setTitlePlaceholder("위치 추가하기");
        break;
      case "move":
        setTitlePlaceholder("이동수단을 선택해주세요");
        break;
      default:
        setTitlePlaceholder("");
    }
  }, [type]);

  return (
    <div>
      <input
        className="w-full h-10 pl-2 text-lg outline-none bg-white font-bold"
        type="text"
        name="title"
        value={inpTitleValue}
        onChange={handleTitleChange}
        placeholder={titlePlaceholder}
        disabled={type === "move"}
      />
      {type === "move" && (
        <ul className="my-5 mx-auto grid grid-cols-3 gap-y-5">
          {["도보", "자전거", "렌트카", "대중교통", "선박", "항공"].map(
            (option) => (
              <TransportOption
                key={option}
                label={option}
                onClick={handleMoveTitleChange}
              />
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default BottomSheetTitle;
