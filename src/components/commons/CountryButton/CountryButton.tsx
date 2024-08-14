import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Image from "next/image";

type SizeProps = "sm" | "md" | "lg";
type ImgSizeProps = "sm" | "md" | "lg";

const countryButtonVariant = cva("", {
  variants: {
    size: {
      sm: "w-[170px]",
      md: "w-[343px]",
      lg: "w-[500px]",
    },
    imgSize: {
      sm: "w-[52px] h-[60px]",
      md: "w-[84px] h-[84px]",
      lg: "w-25 h-25",
    },
  },
});

type countryButtonVariants = VariantProps<typeof countryButtonVariant>;

type CountryButtonProps = countryButtonVariants & {
  size: SizeProps;
  imgPath: string;
  alt: string;
  imgSize: ImgSizeProps;
  countryName: string;
  desc?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  isCountry?: boolean;
};

function CountryButton({
  size,
  imgPath,
  alt,
  imgSize,
  countryName,
  desc,
  onClick,
  isCountry,
}: CountryButtonProps) {
  return (
    <div
      className={clsx(
        "flex justify-start items-center overflow-hidden px-4",
        countryButtonVariant({ size })
      )}
    >
      <div
        className={clsx(
          "relative overflow-hidden",
          countryButtonVariant({ imgSize })
        )}
      >
        <div className="relative w-full h-full overflow-hidden rounded-t-full rounded-b-[800px] bg-neutral-200">
          <Image
            src={imgPath}
            alt={alt}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="ml-3 flex-1 min-w-0">
        <span
          className={clsx("cursor-pointer", {
            "font-semibold": !!desc,
          })}
          onClick={onClick}
        >
          {countryName}
        </span>
        {desc && (
          <p
            className={clsx("text-sm overflow-hidden text-ellipsis leading-5", {
              "line-clamp-2": !isCountry,
              "whitespace-nowrap": isCountry,
              "text-slate-400": isCountry,
            })}
          >
            {desc}
          </p>
        )}
      </div>
    </div>
  );
}

export default CountryButton;
