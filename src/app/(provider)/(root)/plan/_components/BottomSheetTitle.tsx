"use client";
import { BottomSheetType, MoveType } from "@/types/plan";
import React, { useEffect, useState } from "react";
import { MOVE_ICONS } from "./icons/MoveIcon";
import TransportOption from "./TransportOption";

function BottomSheetTitle({
  type,
  status,
  title = "",
  onChange: onChangeTitle,
}: BottomSheetType & { title?: string; onChange: (title: string) => void }) {
  const [inpTitleValue, setTitleValue] = useState(title);
  const [titlePlaceholder, setTitlePlaceholder] = useState("");
  const [selectedTransport, setSelectedTransport] = useState<string | null>(
    null
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  const handleMoveTitleChange = (label: string) => {
    setTitleValue(label);
    setSelectedTransport(label);
    onChangeTitle(label);
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
      case "customPlace":
        setTitlePlaceholder("어디로 가시나요?");
        break;
      case "move":
        setTitlePlaceholder("이동 수단");
        break;
    }
  }, [type]);

  useEffect(() => {
    setTitleValue(title);
  }, [title]);

  const types: MoveType[] = [
    "도보",
    "자전거",
    "렌트카",
    "대중교통",
    "선박",
    "항공",
  ];

  return (
    <div>
      <input
        className="w-full h-10 pl-2 text-lg outline-none bg-white font-bold mb-2"
        type="text"
        name="title"
        value={inpTitleValue}
        onChange={handleTitleChange}
        placeholder={titlePlaceholder}
        disabled={type === "move" || status === "read"}
      />
      {type === "move" && (
        <ul className="mb-2 mx-auto grid grid-cols-3 gap-y-5">
          {types.map((type) => (
            <TransportOption
              key={type}
              label={type}
              icon={MOVE_ICONS[type]}
              onClick={handleMoveTitleChange}
              isSelected={selectedTransport === type}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default BottomSheetTitle;
