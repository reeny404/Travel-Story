"use client";

import { Dispatch } from "react";

type BottomSheetInputProps = {
  textValue: string;
  setTextValue: Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
};

export default function BottomSheetInput({
  textValue,
  setTextValue,
  placeholder = "어떤 경험을 공유하고 싶으신가요?",
}: BottomSheetInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  return (
    <textarea
      className="border-[1.25px] border-neutral-200 text-neutral-400 rounded-lg p-4 h-36"
      value={textValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}
