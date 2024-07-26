import { BottomSheetType } from "@/types/plan";
import React, { useEffect, useState } from "react";

function BottomSheetTitle({ type, status }: BottomSheetType) {
  const [inpTitleValue, setTitleValue] = useState("");
  const [titlePlaceholder, setTitlePlaceholder] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
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
        className="w-full h-10 pl-2 text-lg outline-none"
        type="text"
        name="title"
        value={inpTitleValue}
        onChange={handleTitleChange}
        placeholder={titlePlaceholder}
      />
    </div>
  );
}

export default BottomSheetTitle;
