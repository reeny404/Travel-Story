"use client";
import { BottomSheetType } from "@/types/plan";
import React, { useEffect, useState } from "react";
import AirplaneIcon from "./icons/AirplaneIcon";
import BicycleIcon from "./icons/BicycleIcon";
import CarIcon from "./icons/CarIcon";
import PublicTransportIcon from "./icons/PublicTransportIcon";
import ShipIcon from "./icons/ShipIcon";
import WalkingIcon from "./icons/WalkingIcon";
import TransportOption from "./TransportOption";

const icons = [
  WalkingIcon,
  BicycleIcon,
  CarIcon,
  PublicTransportIcon,
  ShipIcon,
  AirplaneIcon,
];

function BottomSheetTitle({ type, status }: BottomSheetType) {
  const [inpTitleValue, setTitleValue] = useState("");
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
      case "customePlace":
        setTitlePlaceholder("어디로 가시나요?");
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
          {["도보", "자전거", "렌트카", "대중교통", "선박", "항공"].map(
            (option, index) => (
              <TransportOption
                key={option}
                label={option}
                icon={icons[index]}
                onClick={handleMoveTitleChange}
                isSelected={selectedTransport === option}
              />
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default BottomSheetTitle;
