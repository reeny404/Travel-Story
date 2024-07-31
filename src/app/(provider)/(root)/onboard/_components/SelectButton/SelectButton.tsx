"use client";

import { useTravelType } from "@/stores/travelType.store";
import { MouseEvent, useState } from "react";

type SelectButtonProps = {
  text: string;
  category: "theme" | "season" | "travelMate" | "country";
};

function SelectButton({ text, category }: SelectButtonProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const {
    setTheme,
    setSeason,
    setTravelMate,
    clearTheme,
    clearSeason,
    clearTravelMate,
  } = useTravelType();

  const actions = {
    theme: { set: setTheme, clear: clearTheme },
    season: { set: setSeason, clear: clearSeason },
    travelMate: { set: setTravelMate, clear: clearTravelMate },
  };
  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const action = actions[category];

    if (!isClicked) {
      action.set(text);
    } else {
      action.clear(text);
    }
    setIsClicked(!isClicked);
  };

  return (
    <button
      onClick={(e) => handleClick(e)}
      className={`${isClicked ? "bg-[#0066FF]" : "bg-white"} py-[11px] px-[16px] rounded-lg`}
    >
      <p
        className={`text-[16px] ${isClicked ? "text-white font-bold" : "text-black"}`}
      >
        {text}
      </p>
    </button>
  );
}

export default SelectButton;
