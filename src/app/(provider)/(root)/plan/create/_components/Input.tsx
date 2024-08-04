"use client";

import { ChangeEventHandler, ComponentProps, useState } from "react";

type InputProps = {
  setText: (text: string) => void;
  text: string;
} & ComponentProps<"input">;

function Input({ setText, text: title, ...props }: InputProps) {
  const [val, setVal] = useState<string>(title);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const text = e.target.value;
    setVal(text);
    setText(text);
  };

  return <input value={val} onChange={onChange} {...props} />;
}

export default Input;
