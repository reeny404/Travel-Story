"use client";

import { COLOR as baseColors } from "@/constants/color";
import {
  IconComponentType,
  loadSvgIconType,
  SvgIconProps,
} from "@/types/SvgIcon";
import Image from "next/image";
import { lazy } from "react";
import { colors as themeColors } from "../../../../styles/theme/colors";

const customColor = { ...themeColors, ...baseColors };

// 동일 페이지 내 같은 아이콘 반복 import 방지용 캐시 역할 객체
const iconCache: { [key: string]: IconComponentType } = {};

const loadSvgIcon = ({
  name,
  width,
  height,
}: loadSvgIconType): IconComponentType => {
  if (!iconCache[name]) {
    iconCache[name] = lazy(() =>
      import(`@/assets/icons/${name}.svg`).catch(() => {
        return {
          default: () => (
            <Image
              src="/logo.svg"
              alt="fallback icon"
              width={width}
              height={height}
            />
          ),
        };
      })
    );
  }
  return iconCache[name];
};

const getColor = (initialColor: any, colorPath: string): string | undefined => {
  let color = initialColor[colorPath];

  if (color === undefined) {
    color = colorPath
      .split("-")
      .reduce((color, number) => color && color[number], initialColor) as
      | string
      | undefined;
  }

  return color;
};

const SvgIcon = ({
  name,
  color = "primary",
  width = 20,
  height = 20,
  strokeWidth = 1.75,
  className,
  title,
  hasStroke = false,
}: SvgIconProps) => {
  const Icon = loadSvgIcon({ name, width, height });
  const fillColor = getColor(customColor, color) || color;

  return (
    <button
      className={`flex justify-center items-center cursor-pointer ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      type="button"
    >
      <Icon
        width={width}
        height={height}
        fill={hasStroke ? "none" : fillColor}
        stroke={hasStroke ? fillColor : "none"}
        strokeWidth={hasStroke ? strokeWidth : "none"}
        title={title}
        role="image"
      />
    </button>
  );
};
export default SvgIcon;
