import { useOnboardStore } from "@/stores/onboard.store";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";

const buttonVariants = cva(
  "flex justify-center items-center gap-3 shadow-lg rounded-lg text-lg font-semibold",
  {
    variants: {
      intent: {
        default: "flex-col px-5 py-4",
        width: "flex-row flex-grow p-4",
        full: "flex-row w-full",
      },
      isClicked: {
        true: "border border-brand-600 bg-gradient-to-t from-brand-600 to-white",
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
  text: string;
  image: string;
  index: number;
} & ButtonVariantsType;

function ContinentButton({ text, image, intent, index }: ButtonProps) {
  const { isSelectedOne, setIsSelectedOne, setIsInputValid } =
    useOnboardStore();
  const selected = isSelectedOne === index;
  const handleClick = () => {
    setIsSelectedOne(index);
    setIsInputValid(false);
  };
  return (
    <button
      onClick={handleClick}
      className={buttonVariants({
        intent,
        isClicked: selected,
      })}
    >
      <Image src={`/onboard/${image}.png`} width={72} height={72} alt="icon" />
      {text}
    </button>
  );
}

export default ContinentButton;
