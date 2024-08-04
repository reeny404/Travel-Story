import { LatLng } from "./LatLng";
import { TablesInsert } from "./supabase";

export type PlanChildType =
  | "customePlace"
  | "place"
  | "move"
  | "memo"
  | "spend";

export type BottomSheetType = {
  type: PlanChildType;
  status: "add" | "read" | "update";
};

export type PlanInsertType = TablesInsert<"plan">;

export type Schedule = {
  title: string;
  latlng: LatLng;
  areaId: number;
};

export type OrderList = {
  id: string;
  type: string;
};
export type ScheduleData = {
  planId: string;
  userId: string;
  areaId: number;
  orderList: OrderList[];
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
