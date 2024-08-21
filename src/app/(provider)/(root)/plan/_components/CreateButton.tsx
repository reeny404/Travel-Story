"use client";

import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = {
  bg: string | null;
} & PropsWithChildren;

function CreateButton({ children, bg }: Props) {
  return (
    <div
      className={clsx(
        "w-12 h-12 flex items-center justify-center bg-lime-300 shadow-lg rounded-full cursor-pointer group hover:bg-gray-750",
        bg
      )}
    >
      {children}
    </div>
  );
}

export default CreateButton;
