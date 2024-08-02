import { LatLng } from "./LatLng";

export type PlanChildType = "customePlace" | "place" | "move" | "memo" | "spend";

export type BottomSheetType = {
  type: PlanChildType;
  status: "add" | "read" | "update";
};

export type Schedule = {
  title: string;
  latlng: LatLng;
  areaId: number;
}
