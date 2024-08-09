import { LatLng } from "./LatLng";
import { Tables, TablesInsert } from "./supabase";

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

export type Plan = Tables<"plan">;
export type PlanInsertType = TablesInsert<"plan">;

export type PlanChildData = Schedule | Memo | MoveSchedule | CustomPlace;

export type MoveType = "도보" | "자전거" | "렌트카" | "대중교통" | "선박" | "항공";
export type MoveSchedule = {
  type: MoveType;
  memo: string;
  planId: string;
  startTime?: string;
  endTime?: string;
  imagesUrl: string[];
};

export type Memo = {
  planId: string;
  title: string;
  content: string;
  check: Todo[];
};

export type CustomPlace = {
  title: string;
  latlng: LatLng;
  areaId: number;
}

export type Schedule = {
  title: string;
  latlng: LatLng;
  areaId: number;

  planId: string;
  place: string
  type: PlanChildType;
  startTime?: string;
  endTime?: string;
  memo: string;
  imagesUrl: string[];
};

export type Todo = { text: string; isCheck: boolean };
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

export type AreaType = { data: Tables<'area'> } & Order;
export type SupabaseScheduleType = { data: Tables<'schedule'> & { area?: AreaType } } & Order;
export type SupabaseMemoType = { data: Tables<'memo'> } & Order;
export type SupabaseMoveType = { data: Tables<'moveSchedule'> } & Order;