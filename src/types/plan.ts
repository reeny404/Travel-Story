import { LatLng } from "./LatLng";
import { Tables, TablesInsert } from "./supabase";

export type PlanChildType = "customPlace" | "place" | "move" | "memo" | "spend";

export type BottomSheetType = {
  type: PlanChildType;
  status: "add" | "read" | "update";
};

export type Plan = Tables<"plan">;
export type PlanInsertType = TablesInsert<"plan">;

export type Schedule = {
  title: string;
  latlng: LatLng;
  areaId: number;
};

export type Order = {
  id: string;
  type: PlanChildType;
};

export type ScheduleData = {
  planId: string;
  userId: string;
  areaId: number;
  orderList: Order[];
  krName: string;
  day: number | null;
  type: string;
  latlng: LatLng;
};

export type PlanData = {
  userId: string;
  areaId: number;
  title: string;
  startDate: string;
  endDate: string;
};
