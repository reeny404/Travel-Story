import clsx from "clsx";
import { JSXElementConstructor } from "react";

type Props = {
  Icon: JSXElementConstructor<{ className: string; onClick: () => void }>;
  onClick?: () => void;
  color?: { bg: string; icon: string };
};

function CreateButton({ Icon, onClick, color }: Props) {
  return (
    <div
      className={clsx(
        "w-12 h-12 flex items-center justify-center bg-lime-300 shadow-lg rounded-full group hover:bg-gray-750",
        color?.bg
      )}
    >
      <Icon
        className={clsx("text-black group-hover:text-white", color?.icon)}
        onClick={onClick ?? (() => {})}
      />
    </div>
  );
}

export default CreateButton;
