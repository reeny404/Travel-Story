import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const BadgeVariant = cva("px-3 py-1 rounded-full hover:brightness-90", {
  variants: {
    intent: {
      active: "bg-black text-white",
      default: "bg-white text-black",
    },
    outline: {
      true: "border border-gray-200",
      false: "",
    },
  },
  defaultVariants: {
    intent: "default",
    outline: true,
  },
});

type BadgeProps = PropsWithChildren & VariantProps<typeof BadgeVariant>;

function Badge({ intent, outline, children }: BadgeProps) {
  return <div className={BadgeVariant({ intent, outline })}>{children}</div>;
}

export default Badge;
