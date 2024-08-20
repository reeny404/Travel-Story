"use client";

import Icon from "@/components/commons/Icon";
import { ICON } from "@/constants/icon";
import { TRAVEL_TYPES } from "@/constants/onboard";
import { useState } from "react";
import Button from "./Button";

type Props = {
  setTypes: (words: string[]) => void;
  close: () => void;
};

function TravelType({ setTypes, close }: Props) {
  const [themes, setThemes] = useState<string[]>([]);
  const handleClick = (text: string) => () => {
    const isSelected: boolean = !!themes.find((theme) => theme === text);
    const newThemes: string[] = isSelected
      ? themes.filter((theme) => theme !== text)
      : [...themes, text];
    setThemes(newThemes);
  };

  return (
    <div className="w-full absolute top-0 left-0 right-0 bottom-0 px-4 bg-white z-30">
      <header className="flex justify-end">
        <Icon icon={ICON.cancel.black} alt="x" size={20} onClick={close} />
      </header>
      <h1 className="w-full mb-12 text-3xl font-semibold leading-9 whitespace-pre-wrap">
        어떻게
        <br />
        보내실 건가요?
      </h1>
      <section>
        <div className="grid grid-cols-3 w-full px-4 gap-4">
          {TRAVEL_TYPES.map((type, index) => (
            <Button
              key={index}
              option={type}
              selected={!!themes.find((theme) => theme === type.text)}
              handleClick={handleClick(type.text)}
            />
          ))}
        </div>
      </section>
      <div className="w-full pt-9 flex justify-center">
        <button
          className="w-11/12 py-2 rounded-lg border border-gray-750 bg-gray-750 text-white hover:bg-white hover:text-gray-750"
          onClick={() => setTypes(themes)}
        >
          적용하기
        </button>
      </div>
    </div>
  );
}

export default TravelType;
