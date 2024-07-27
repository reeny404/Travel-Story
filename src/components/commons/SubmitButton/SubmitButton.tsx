import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

type SubmitButtonTheme = "primary" | "light" | "kakao";
type SubmitButtonSize = "sm" | "md" | "lg";

const buttonVariant = cva("rounded-lg font-semibold", {
  variants: {
    theme: {
      primary: "bg-black text-white",
      light: "bg-white text-black",
      kakao: "bg-[#F9E000] text-black",
    },
    size: {
      sm: "px-4 py-1",
      md: "px-6 py-2",
      lg: "w-[338px] h-12 px-4 py-2",
    },
    variant: {
      default: "",
      outline: "border border-black",
    },
    disabled: {
      true: "!bg-[#CECECE] border-none text-white cursor-not-allowed",
      false: "hover:opacity-85 active:opacity-80",
    },
  },
  compoundVariants: [
    {
      theme: "primary",
      variant: "outline",
      size: "lg",
      className: "bg-white !text-black font-normal border-black",
    },
    {
      theme: "primary",
      variant: "outline",
      size: "md",
      className: "bg-white !text-black font-normal border-black",
    },
    {
      theme: "primary",
      variant: "outline",
      size: "sm",
      className: "bg-white !text-black text-sm font-normal border-black",
    },
  ],
  defaultVariants: {
    theme: "primary",
    size: "sm",
    disabled: false,
  },
});

type ButtonVariants = VariantProps<typeof buttonVariant>;

type SubmitButtonProps = Omit<ButtonVariants, "theme"> & {
  theme: SubmitButtonTheme;
  size?: SubmitButtonSize;
} & ComponentProps<"button">;

function SubmitButton({
  theme,
  variant,
  size,
  disabled,
  children,
  ...props
}: PropsWithChildren<SubmitButtonProps>) {
  return (
    <button
      type="submit"
      className={buttonVariant({ theme, variant, size, disabled })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
