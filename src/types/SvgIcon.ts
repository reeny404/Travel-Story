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
  onClick?: () => void;
};

export type loadSvgIconType = {
  name: string;
  width: number;
  height: number;
};

export type IconComponentType =
  | (LazyExoticComponent<ComponentType<ExtendedSVGProps>> & {
      preload?: () => void;
    })
  | (ComponentType<ExtendedSVGProps> & { preload?: () => void });

export type ExtendedSVGProps = SVGProps<SVGSVGElement> & { title?: string };

export type SvgIconWithPreload = {
  (props: SvgIconProps): JSX.Element;
  preload: (name: string) => Promise<void>;
};
