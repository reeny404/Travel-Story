import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

type PrimaryButtonTheme = "dark" | "light" | "social";

const buttonVariant = cva("w-[338px] h-12 rounded-lg px-4 py-2 font-semibold", {
  variants: {
    theme: {
      dark: "bg-black text-white",
      light: "bg-white text-black",
      social: "bg-[#F9E000] text-black",
    },
    disabled: {
      true: "disabled:bg-[#CECECE] disabled:text-white",
      false: "",
    },
  },
  defaultVariants: {
    theme: "dark",
    disabled: false,
  },
});

type ButtonVariants = VariantProps<typeof buttonVariant>;

type PrimaryButtonProps = Omit<ButtonVariants, "theme"> & {
  theme: PrimaryButtonTheme;
} & ComponentProps<"button">;

// type PrimaryButtonProps = ButtonVariants & ComponentProps<"button">;

function PrimaryButton({
  theme,
  disabled,
  children,
  ...props
}: PropsWithChildren<PrimaryButtonProps>) {
  return (
    <button
      type="submit"
      className={buttonVariant({ theme, disabled })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
