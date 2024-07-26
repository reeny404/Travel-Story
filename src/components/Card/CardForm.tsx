// components/CardForm.js
import { IntroCities } from "@/types/Recommend";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type CardFormProps = CardFormVariantProps & {
  title?: string;
  description?: string;
  items?: IntroCities[];
  rating?: number;
  linkUrl?: string;
} & ComponentProps<"div">;

type CardFormVariantProps = VariantProps<typeof cardFormVariant>;

const cardFormVariant = cva("m-2 w-full ", {
  variants: {
    intent: {
      intro: "p-9 pt-7 pb-10 flex flex-col justify-around h-1/3",
      detail: "p-4 ",
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
  linkUrl,
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
  };

  return (
    <div className={cardFormVariant({ intent })} {...props}>
      {intent !== "intro" ? (
        <>
          <Link
            href={linkUrl!}
            className={clsx(
              "text-xl font-bold mt-2 mb-2",
              intent === "review" && "text-[15px]"
            )}
          >
            {title}
          </Link>
          <p
            className={clsx(
              rating !== undefined && rating >= 0 && "mb-3",
              intent === "review" &&
                "text-sm overflow-x-hidden whitespace-nowrap text-ellipsis"
            )}
          >
            {description}
          </p>
          {rating !== undefined && makeRatingIcon(rating)}
        </>
      ) : (
        items?.map((item, index) => (
          <Link
            href={`/recommend/city/${item.id}` || "/"}
            key={index}
            className="font-semibold max-w-28"
          >
            {item.name}
          </Link>
        ))
      )}
    </div>
  );
};

export default CardForm;
