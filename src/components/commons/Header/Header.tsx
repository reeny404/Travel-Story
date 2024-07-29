"use client";

import Icon from "@/components/commons/Icon/Icon";
import { cva } from "class-variance-authority";
import { useRouter } from "next/navigation";

const headerStyles = cva("w-full h-[52px] flex items-center justify-between", {
  variants: {
    backgroundColor: {
      transparent: "bg-transparent",
      white: "bg-white",
    },
    titleAlign: {
      left: "justify-start",
      center: "justify-center",
    },
  },
  defaultVariants: {
    backgroundColor: "white",
    titleAlign: "center",
  },
});

export type HeaderProps = {
  backgroundColor?: "transparent" | "white";
  leftIcons?: {
    icon: string;
    alt: string;
    size: number;
    path?: string;
    onClick?: () => void;
  }[];
  title?: string;
  titleAlign?: "left" | "center";
  rightIcons?: {
    icon: string;
    alt: string;
    size: number;
    path?: string;
    onClick?: () => void;
  }[];
};

function Header({
  backgroundColor,
  leftIcons,
  title = "TripStory",
  titleAlign = "center",
  rightIcons,
}: HeaderProps) {
  const router = useRouter();

  const handleIconClick = (path?: string, onClick?: () => void) => {
    if (path === "back") {
      router.back();
      return;
    }

    if (path) {
      router.push(path);
      return;
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <header className={headerStyles({ backgroundColor, titleAlign })}>
      <div className="flex items-center">
        {leftIcons &&
          leftIcons.map((icon, index) => (
            <Icon
              key={index}
              icon={icon.icon}
              alt={icon.alt}
              size={icon.size}
              onClick={() => handleIconClick(icon.path, icon.onClick)}
            />
          ))}
        {titleAlign === "left" && (
          <h2 className="text-[18px] font-semibold ml-2">{title}</h2>
        )}
      </div>
      {titleAlign === "center" && (
        <h2 className="absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px]">
          {title}
        </h2>
      )}

      <div className="flex items-center ml-auto">
        {rightIcons &&
          rightIcons.map((icon, index) => (
            <Icon
              key={index}
              icon={icon.icon}
              alt={icon.alt}
              size={icon.size}
              onClick={() => handleIconClick(icon.path, icon.onClick)}
            />
          ))}
      </div>
    </header>
  );
}

export default Header;
