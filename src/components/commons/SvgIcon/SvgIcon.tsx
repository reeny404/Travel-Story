import { COLOR as baseColors } from "@/constants/color";
import { IconComponentType, SvgIconProps } from "@/types/SvgIcon";
import Image from "next/image";
import { lazy } from "react";
import { colors as themeColors } from "../../../../styles/theme/colors";

const customColor = { ...themeColors, ...baseColors };

// 동일 페이지 내 같은 아이콘 반복 import 방지용 캐시 역할 객체
const iconCache: {
  [key: string]: IconComponentType;
} = {};

const loadSvgIcon = (name: string): IconComponentType => {
  if (!iconCache[name]) {
    iconCache[name] = lazy(() =>
      import(`@/assets/icons/${name}.svg`).catch(() => {
        return {
          default: () => (
            <Image src="/logo.svg" alt="fallback icon" width={20} height={20} />
          ),
        };
      })
    );
  }
  return iconCache[name];
};

const getColor = (initialColor: any, colorPath: string): string | undefined => {
  return colorPath
    .split("-")
    .reduce((color, number) => color && color[number], initialColor) as
    | string
    | undefined;
};

const SvgIcon = ({
  name,
  color = "primary",
  size = 20,
  className = "",
  title,
}: SvgIconProps) => {
  const Icon = loadSvgIcon(name);

  const fillColor = getColor(customColor, color) || color;

  return (
    <div
      className={`flex justify-center items-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Icon
        width={size}
        height={size}
        fill={fillColor}
        title={title}
        role="image"
      />
    </div>
  );
};
export default SvgIcon;
