"use client";

import { COLOR as baseColors } from "@/constants/color";
import {
  IconComponentType,
  loadSvgIconType,
  SvgIconProps,
  SvgIconWithPreload,
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
  if (iconCache[name]) {
    return iconCache[name];
  }

  iconCache[name] = lazy(() =>
    import(`@/assets/icons/${name}.svg`).catch(() => {
      return {
        default: () => (
          <Image
            src="/travelstory-logo.png"
            alt="fallback icon"
            width={width}
            height={height}
          />
        ),
      };
    })
  );

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
  title,
  className,
  hasStroke = false,
  strokeWidth = 1.75,
  onClick,
}: SvgIconProps) => {
  const Icon = loadSvgIcon({ name, width, height });
  const fillColor = getColor(customColor, color) || color;

  return (
    <Icon
      width={width}
      height={height}
      fill={hasStroke ? "none" : fillColor}
      stroke={hasStroke ? fillColor : "none"}
      strokeWidth={hasStroke ? strokeWidth : "none"}
      title={title}
      role="image"
      onClick={onClick}
      className={className}
    />
  );
};

// input 동작시점과의 충돌이 있는 곳에 사용하는 preload 기능
(SvgIcon as SvgIconWithPreload).preload = async (name: string) => {
  if (!iconCache[name]) {
    const preloadIcon = await import(`@/assets/icons/${name}.svg`);
    iconCache[name] = preloadIcon.default as IconComponentType;
  }
};

export default SvgIcon as SvgIconWithPreload;
