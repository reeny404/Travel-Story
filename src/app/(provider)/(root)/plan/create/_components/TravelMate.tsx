"use client";

import Icon from "@/components/commons/Icon";
import { ICON } from "@/constants/icon";
import { TRAVEL_MATES } from "@/constants/onboard";
import { useState } from "react";
import Button from "./Button";

type Props = {
  setMate: (text: string) => void;
  close: () => void;
};

function TravelMate({ setMate, close }: Props) {
  const [selected, setSelected] = useState<string>("");
  const handleClick = (text: string) => () => setSelected(text);

  return (
    <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 px-4 bg-white z-30">
      <header className="flex justify-end">
        <Icon icon={ICON.cancel.black} alt="x" size={20} onClick={close} />
      </header>
      <h1 className="w-full mb-12 text-3xl font-semibold leading-9 whitespace-pre-wrap">
        누구와
        <br />
        함께 하시나요?
      </h1>
      <section className="grid grid-cols-3 w-full px-4 gap-4">
        {TRAVEL_MATES.map((mate, index) => (
          <div
            key={index}
            className={index === 0 ? "col-start-1 col-end-4" : ""}
          >
            <Button
              option={mate}
              selected={selected === mate.text}
              handleClick={handleClick(mate.text)}
            />
          </div>
        ))}
      </section>
      <div className="w-full pt-9 flex justify-center">
        <button
          className="w-11/12 py-2 rounded-lg border border-gray-750 bg-gray-750 text-white hover:bg-white hover:text-gray-750"
          onClick={() => setMate(selected)}
        >
          적용하기
        </button>
      </div>
    </div>
  );
}

export default TravelMate;
