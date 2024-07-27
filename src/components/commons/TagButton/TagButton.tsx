import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

type TagButtonTheme = "primary" | "blue";
type TagButtonSize = "xs" | "sm" | "md" | "lg";

const tagVariant = cva("text-sm rounded-2xl hover:opacity-90", {
  variants: {
    theme: {
      primary: "bg-transparent border border-black text-black",
      blue: "bg-[#06F] text-white font-semibold",
    },
    size: {
      xs: "px-2 py-[1px]",
      sm: "px-3 py-1",
      md: "px-4 py-[6px]",
      lg: "px-[30px] py-2",
    },
    isChecked: {
      true: "!bg-blue-400 border-blue-400 text-white font-semibold",
      false: "",
    },
  },
  defaultVariants: {
    theme: "primary",
    size: "sm",
    isChecked: false,
  },
});

type TagVariants = VariantProps<typeof tagVariant>;

type TagButtonProps = Omit<TagVariants, "size"> & {
  theme: TagButtonTheme;
  size: TagButtonSize;
} & ComponentProps<"button">;

function TagButton({
  theme,
  size,
  isChecked,
  children,
  ...props
}: PropsWithChildren<TagButtonProps>) {
  return (
    <button
      type="button"
      className={tagVariant({ theme, size, isChecked })}
      {...props}
    >
      <div className="flex justify-center items-center gap-1">{children}</div>
    </button>
  );
}

export default TagButton;
