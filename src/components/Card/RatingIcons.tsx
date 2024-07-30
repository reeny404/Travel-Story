"use client";

import Image from "next/image";

const MAXIMUM_RATING = 5;

function RatingIcons({ rating }: { rating: number }) {
  const filledIcon = rating;
  const unFilledIcon = MAXIMUM_RATING - rating;

  return (
    <div className="flex relative w-full aspect-auto">
      {Array.from({ length: filledIcon }).map((_, index) => (
        <Image
          key={`filled-${index}`}
          src="/cardImages/filledStar.svg"
          alt="filled star"
          width={15}
          height={15}
          className="object-contain"
        />
      ))}
      {Array.from({ length: unFilledIcon }).map((_, index) => (
        <Image
          key={`unfilled-${index}`}
          src="/cardImages/unFilledStar.svg"
          alt="unfilled star"
          width={15}
          height={15}
          className="object-contain"
        />
      ))}
    </div>
  );
}

export default RatingIcons;
