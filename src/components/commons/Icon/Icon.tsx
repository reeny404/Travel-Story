import Image from "next/image";

type IconProps = {
  icon: string;
  alt?: string;
  size?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Icon({ icon, alt = "icon", size = 20, onClick }: IconProps) {
  const iconPath = `/icons/${icon}.png`;

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
