export type Color = "red" | "green" | "purple" | "blue";

const COLORS_NAME: Color[] = ["red", "green", "purple", "blue"];
const COLORS = ["#ED795A", "#29C273", "#AA82E2", "#4394ED"];

export function getColorChip(i: number): string {
  return COLORS[i % COLORS.length];
}

export function getColorName(i: number): Color {
  return COLORS_NAME[i % COLORS_NAME.length];
}