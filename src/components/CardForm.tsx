// components/CardForm.js
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";

type cardFormProps = cardFormVariantProps & {
  title?: string;
  description?: string;
  items?: string[];
} & ComponentProps<"div">;

type cardFormVariantProps = VariantProps<typeof cardFormVariant>;

const cardFormVariant = cva("m-2 w-full", {
  variants: {
    intent: {
      intro: "p-4",
      detail: "p-9 pt-7 pb-16 h-[250px] flex flex-col justify-around",
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
  ...props
}: cardFormProps) => {
  return (
    <div className={cardFormVariant({ intent })} {...props}>
      {intent === "intro" ? (
        <>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="">{description}</p>
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
