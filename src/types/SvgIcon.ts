import { ComponentType, LazyExoticComponent, SVGProps } from "react";

export type SvgIconProps = {
  name: string;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number | string;
  className?: string;
  title?: string;
  hasStroke?: boolean;
};

export type loadSvgIconType = {
  name: string;
  width: number;
  height: number;
};

export type IconComponentType =
  | LazyExoticComponent<ComponentType<ExtendedSVGProps>>
  | ComponentType<ExtendedSVGProps>;

export type ExtendedSVGProps = SVGProps<SVGSVGElement> & { title?: string };
