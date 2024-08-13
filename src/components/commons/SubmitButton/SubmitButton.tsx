import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

type SubmitButtonTheme = "primary" | "light" | "kakao";
type SubmitButtonSize = "sm" | "md" | "lg" | "full";

const buttonVariant = cva("rounded-lg font-semibold", {
  variants: {
    theme: {
      primary: "bg-primary text-white",
      light: "bg-white text-primary",
      kakao: "bg-[#F9E000] text-primary",
    },
    size: {
      sm: "px-4 py-1",
      md: "px-6 py-2",
      lg: "w-[343px] h-11 px-4 py-2",
      full: "w-full h-11 px-4 py-2",
    },
    variant: {
      default: "",
      outline: "border border-primary",
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
      className: "bg-white !text-primary font-normal border-primary",
    },
    {
      theme: "primary",
      variant: "outline",
      size: "md",
      className: "bg-white !text-primary font-normal border-primary",
    },
    {
      theme: "primary",
      variant: "outline",
      size: "sm",
      className: "bg-white !text-primary text-sm font-normal border-primary",
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
  className,
  ...props
}: PropsWithChildren<SubmitButtonProps>) {
  return (
    <button
      type="submit"
      className={`${buttonVariant({ theme, variant, size, disabled })} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
