import { ComponentType, LazyExoticComponent, SVGProps } from "react";

export type SvgIconProps = {
  name: string;
  color?: string;
  size?: number;
  className?: string;
  title?: string;
};

export type IconComponentType =
  | LazyExoticComponent<ComponentType<ExtendedSVGProps>>
  | ComponentType<ExtendedSVGProps>;

export type ExtendedSVGProps = SVGProps<SVGSVGElement> & { title?: string };
