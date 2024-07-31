import { IconType } from "@/types/Icon";
import Image from "next/image";
import { getIconPath } from "./getIconPath";

type IconProps = {
  icon: IconType;
  alt?: string;
  size?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Icon({ icon, alt = "icon", size = 20, onClick }: IconProps) {
  const iconPath: string = getIconPath(icon);

  return (
    <button
      className="flex justify-center items-center w-11 h-11"
      onClick={onClick}
    >
      <Image src={iconPath} alt={alt} width={size} height={size} />
    </button>
  );
}

export default Icon;
