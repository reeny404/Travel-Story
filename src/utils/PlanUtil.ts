import { Order, OrderList } from "@/types/plan";
import { UserMetadata } from "@supabase/supabase-js";
import { DateUtil } from "./DateUtil";

function getTitle(meta?: UserMetadata): string {
  if (!meta) {
    return "나만의 여행";
  }
  const nickname = meta.name || meta.nickname;
  return `${nickname}님의 여행`;
}

function initOrderList(startDate: string | undefined | null, endDate: string | undefined | null): OrderList {
  const gapDay = DateUtil.getGapDayByString(startDate ?? "", endDate ?? "");
  return new Array(gapDay)
    .fill(0)
    .map(() => new Array<Order>());
}

function addToOrderList() {

}

export const PlanUtil = {
  getTitle,
  order: {
    init: initOrderList,
    add: addToOrderList,
  }
}