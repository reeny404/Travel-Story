"use client";

import clsx from "clsx";
import Link from "next/link";
import { JSXElementConstructor } from "react";

type Props = {
  Icon: JSXElementConstructor<{ className: string; onClick?: () => void }>;
  onClick?: () => void;
  href?: string;
  color?: { bg: string; icon: string };
};

function CreateButton({ Icon, onClick, href, color }: Props) {
  if (href) {
  }
  return (
    <div
      className={clsx(
        "w-12 h-12 flex items-center justify-center bg-lime-300 shadow-lg rounded-full cursor-pointer group hover:bg-gray-750",
        color?.bg
      )}
    >
      {href ? (
        <Link href={href}>
          <Icon
            className={clsx("text-black group-hover:text-white", color?.icon)}
          />
        </Link>
      ) : (
        <Icon
          className={clsx("text-black group-hover:text-white", color?.icon)}
          onClick={onClick}
        />
      )}
    </div>
  );
}

export default CreateButton;
