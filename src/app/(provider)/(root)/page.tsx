"use client";

import TagButton from "@/components/Tags/TagButton";
import Image from "next/image";
import { useState } from "react";
import SubmitButton from "./../../../components/Buttons/SubmitButton";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <SubmitButton theme="dark" onClick={() => alert("hi")} disabled={true}>
        button
      </SubmitButton>
      <TagButton intent="primary" size="sm">
        버튼 체크
      </TagButton>
      <TagButton
        intent="primary"
        size="sm"
        isChecked={isChecked}
        onClick={handleClick}
      >
        <Image src={"/testImg/logo2.png"} alt="logo" width={16} height={16} />
        버튼 체크
      </TagButton>
      <TagButton intent="primary" size="sm">
        버튼 체크
      </TagButton>
      <TagButton intent="primary" size="xs">
        힐링
      </TagButton>
    </div>
  );
}
