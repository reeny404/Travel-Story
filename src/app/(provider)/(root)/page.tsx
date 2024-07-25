"use client";

import TagButton from "@/components/commons/TagButton/TagButton";
import { useState } from "react";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="p-4">
      {/* <SubmitButton
        intent="primary"
        variant="outline"
        onClick={() => alert("hi")}
      >
        button
      </SubmitButton>

      <TagButton
        intent="primary"
        size="sm"
        isChecked={isChecked}
        onClick={handleClick}
      >
        <Image src={"/testImg/logo2.png"} alt="logo" width={16} height={16} />
        버튼 체크
      </TagButton> */}

      <TagButton
        intent="primary"
        size="xs"
        isChecked={isChecked}
        onClick={handleClick}
      >
        일상
      </TagButton>
    </div>
  );
}
