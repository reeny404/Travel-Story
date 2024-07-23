// components/CardForm.js
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Image from "next/image";
import { ComponentProps } from "react";

type cardFormProps = cardFormVariantProps & {
  title?: string;
  description?: string;
  items?: string[];
  rating?: number;
} & ComponentProps<"div">;

type cardFormVariantProps = VariantProps<typeof cardFormVariant>;

const cardFormVariant = cva("m-2 w-full h-1/3", {
  variants: {
    intent: {
      intro: "p-9 pt-7 pb-10 flex flex-col justify-around",
      detail: "p-4",
    },
  },
  defaultVariants: {
    intent: "intro",
  },
});

const CardForm = ({
  intent,
  title,
  description,
  items,
  rating,
  ...props
}: cardFormProps) => {
  const makeRatingIcon = (rating: number) => {
    const maximum = 5;
    const filledIcon = rating;
    const unFilledIcon = maximum - rating;

    return (
      <div className="flex relative w-full aspect-auto">
        {Array.from({ length: filledIcon }).map((_, index) => (
          <Image
            key={`filled-${index}`}
            src="/cardImages/filledStar.svg"
            alt="filled star"
            width={20}
            height={20}
            objectFit="contain"
          />
        ))}
        {Array.from({ length: unFilledIcon }).map((_, index) => (
          <Image
            key={`unfilled-${index}`}
            src="/cardImages/unfilledStar.svg"
            alt="unfilled star"
            width={20}
            height={20}
            objectFit="contain"
          />
        ))}
      </div>
    );
  };

  return (
    <div className={cardFormVariant({ intent })} {...props}>
      {intent === "detail" ? (
        <>
          <h2 className=" text-xl font-bold mt-2 mb-2">{title}</h2>
          <p className={clsx(rating !== undefined && rating >= 0 && "mb-3")}>
            {description}
          </p>
          {rating !== undefined && makeRatingIcon(rating)}
        </>
      ) : (
        items?.map((item, index) => (
          <h2 key={index} className="font-semibold">
            {item}
          </h2>
        ))
      )}
    </div>
  );
};

export default CardForm;
