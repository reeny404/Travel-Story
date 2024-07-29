import { Area } from "@/types/Recommend";

export const filterByAreaType = (areas: Area[], areaType: string) => {
  return areas?.filter((area) => area.type === areaType);
};
