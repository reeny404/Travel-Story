"use client";

import { ICON } from "@/constants/icon";
import clsx from "clsx";
import Image from "next/image";

const MAXIMUM_RATING = 5;

function RatingIcons({ rating, type }: { rating: number; type: string }) {
  const filledIcon = rating;
  const unFilledIconLength = MAXIMUM_RATING - rating;
  return (
    <div
      className={clsx("flex relative w-full aspect-auto", {
        "justify-center": type === "big",
      })}
    >
      {Array.from({ length: filledIcon }).map((_, index) => (
        <Image
          key={`filled-${index}`}
          src={`/icons/${ICON.star.fill}.svg`}
          alt="filled star"
          width={type === "big" ? 20 : 15}
          height={type === "big" ? 20 : 15}
          className={clsx("object-contain")}
        />
      ))}
      {!Number.isInteger(unFilledIconLength) && (
        <Image
          src={`/icons/${ICON.star.half}.svg`}
          alt="unfilled star"
          width={type === "big" ? 20 : 15}
          height={type === "big" ? 20 : 15}
          className={clsx("object-contain")}
        />
      )}
      {Array.from({ length: unFilledIconLength }).map((_, index) => (
        <Image
          key={`unfilled-${index}`}
          src={`/icons/${ICON.star.unfill}.svg`}
          alt="unfilled star"
          width={type === "big" ? 20 : 15}
          height={type === "big" ? 20 : 15}
          className={clsx("object-contain")}
        />
      ))}{" "}
    </div>
  );
}

export default RatingIcons;
