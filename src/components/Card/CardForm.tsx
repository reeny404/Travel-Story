// components/CardForm.js
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type CardFormProps = CardFormVariantProps & {
  title?: string;
  description?: string;
  items?: string[];
  rating?: number;
} & ComponentProps<"div">;

type CardFormVariantProps = VariantProps<typeof cardFormVariant>;

const cardFormVariant = cva("m-2 w-full ", {
  variants: {
    intent: {
      intro: "p-9 pt-7 pb-10 flex flex-col justify-around h-1/3",
      detail: "p-4 h-1/3",
      review: "p-9 pt-7 pb-10 flex flex-col justify-around",
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
}: CardFormProps) => {
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
            width={15}
            height={15}
            objectFit="contain"
          />
        ))}
        {Array.from({ length: unFilledIcon }).map((_, index) => (
          <Image
            key={`unfilled-${index}`}
            src="/cardImages/unfilledStar.svg"
            alt="unfilled star"
            width={15}
            height={15}
            objectFit="contain"
          />
        ))}
      </div>
    );
  };

  return (
    <div className={cardFormVariant({ intent })} {...props}>
      {intent !== "intro" ? (
        <>
          <h2
            className={clsx(
              "text-xl font-bold mt-2 mb-2",
              intent === "review" && "text-[15px]"
            )}
          >
            {title}
          </h2>
          <p
            className={clsx(
              rating !== undefined && rating >= 0 && "mb-3",
              intent === "review" &&
                "text-sm overflow-x-hidden whitespace-nowrap text-ellipsis  "
            )}
          >
            {description}
          </p>
          {rating !== undefined && makeRatingIcon(rating)}
        </>
      ) : (
        items?.map((item, index) => (
          <Link href={"/"} key={index} className="font-semibold">
            {item}
          </Link>
        ))
      )}
    </div>
  );
};

export default CardForm;
