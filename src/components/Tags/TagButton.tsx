import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

type TagButtonSize = "xs" | "sm" | "md" | "lg";

const tagVariant = cva("text-sm", {
  variants: {
    intent: {
      primary: "bg-transparent border border-black text-black",
    },
    size: {
      xs: "px-2 py-[1px] rounded-2xl",
      sm: "px-3 py-1 rounded-2xl",
      md: "px-4 py-[6px] rounded-2xl",
      lg: "px-[40px] py-3 rounded-[40px]",
    },
    isChecked: {
      true: "!bg-blue-400 border-blue-400 text-white font-semibold",
      false: "",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "sm",
    isChecked: false,
  },
});

type TagVariants = VariantProps<typeof tagVariant>;

type TagButtonProps = Omit<TagVariants, "size"> & {
  size: TagButtonSize;
} & ComponentProps<"button">;

function TagButton({
  intent,
  size,
  isChecked,
  children,
  ...props
}: PropsWithChildren<TagButtonProps>) {
  return (
    <button
      type="button"
      className={tagVariant({ intent, size, isChecked })}
      {...props}
    >
      <div className="flex justify-center items-center gap-1">{children}</div>
    </button>
  );
}

export default TagButton;
