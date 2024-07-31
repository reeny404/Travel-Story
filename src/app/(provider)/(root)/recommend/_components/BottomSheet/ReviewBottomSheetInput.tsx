"use client";

import { useState } from "react";

export default function ReviewBottomSheetInput({}) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <textarea
      className="border border-gray-400 outline-none rounded-lg m-4 p-2 h-40  text-sm "
      value={inputValue}
      onChange={handleChange}
      placeholder={"어떤 경험을 공유하고 싶으신가요?"}
    />
  );
}
