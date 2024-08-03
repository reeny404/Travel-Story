import { LatLng } from "./LatLng";
import { TablesInsert } from "./supabase";

export type PlanChildType = "customePlace" | "place" | "move" | "memo" | "spend";

export type BottomSheetType = {
  type: PlanChildType;
  status: "add" | "read" | "update";
};

export type PlanInsertType = TablesInsert<"plan">;

export type Schedule = {
  title: string;
  latlng: LatLng;
  areaId: number;
}
