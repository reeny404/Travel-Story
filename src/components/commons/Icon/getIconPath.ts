import { IconType } from "@/types/Icon";

export function getIconPath(icon: IconType): string {
  return typeof icon === "string"
    ? `/icons/${icon}.png`
    : `/icons/${icon.name}.${icon.ext}`;
}