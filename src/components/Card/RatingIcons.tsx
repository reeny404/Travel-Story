"use client";

import { ICON } from "@/constants/Icon";
import clsx from "clsx";
import Image from "next/image";

const MAXIMUM_RATING = 5;

function RatingIcons({ rating, type }: { rating: number; type: string }) {
  const filledIcon = rating;
  const unFilledIcon = MAXIMUM_RATING - rating;

  return (
    <div
      className={clsx("flex relative w-full aspect-auto", {
        "justify-center": type === "big",
      })}
    >
      {Array.from({ length: filledIcon }).map((_, index) => (
        <Image
          key={`filled-${index}`}
          src={`/icons/${ICON.star.fill}.png`}
          alt="filled star"
          width={type === "big" ? 30 : 15}
          height={type === "big" ? 30 : 15}
          className={clsx("object-contain", { "mr-1": type === "big" })}
        />
      ))}
      {Array.from({ length: unFilledIcon }).map((_, index) => (
        <Image
          key={`unfilled-${index}`}
          src={`/icons/${ICON.star.unfill}.png`}
          alt="unfilled star"
          width={type === "big" ? 30 : 15}
          height={type === "big" ? 30 : 15}
          className={clsx("object-contain", { "mr-1": type === "big" })}
        />
      ))}
    </div>
  );
}

export default RatingIcons;
