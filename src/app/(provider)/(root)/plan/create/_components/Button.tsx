import ImageFrame from "@/components/Frame/ImageFrame";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "w-full flex justify-center items-center gap-3 shadow-lg shadow-gray-200 rounded-lg text-lg font-semibold",
  {
    variants: {
      intent: {
        default: "flex-col px-2 py-3",
      },
      isClicked: {
        true: "border border-brand-600 bg-gradient-to-t from-brand-200",
        false: "border border-white",
      },
    },
    defaultVariants: {
      intent: "default",
      isClicked: false,
    },
  }
);

type ButtonVariantsType = VariantProps<typeof buttonVariants>;

type ButtonProps = {
  option: { text: string; image: string };
  selected: boolean;
  handleClick: () => void;
} & ButtonVariantsType;

function Button({ option, intent, selected, handleClick }: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={buttonVariants({
        intent,
        isClicked: selected,
      })}
    >
      <ImageFrame
        src={`/onboard/${option.image}.png`}
        className="w-16 h-16"
        alt="icon"
      />
      <span>{option.text}</span>
    </button>
  );
}

export default Button;
