export const convertTypeToKr = (type: string) => {
  if (type === "restaurant") {
    return "식당";
  }
  if (type === "place") {
    return "관광지";
  }
  if (type === "accommodation") {
    return "숙소";
  }
  return "쇼핑";
};
