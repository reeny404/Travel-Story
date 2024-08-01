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
      sm: "w-6 h-6",
      md: "w-10 h-10",
      lg: "w-14 h-14",
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
        "flex justify-start items-center overflow-hidden",
        countryButtonVariant({ size })
      )}
    >
      <div
        className={clsx(
          "relative flex-none border border-slate-100 rounded-full cursor-pointer overflow-hidden",
          countryButtonVariant({ imgSize })
        )}
        onClick={onClick}
      >
        <Image src={imgPath} alt={alt} fill={true} className="object-cover" />
      </div>

      <div className="ml-[10px] flex-1 min-w-0">
        <span
          className={clsx("text-[15px] cursor-pointer", {
            "font-semibold": !!desc,
          })}
          onClick={onClick}
        >
          {countryName}
        </span>
        {desc && (
          <p
            className={clsx("text-sm overflow-hidden text-ellipsis", {
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
