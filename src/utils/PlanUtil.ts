import { Order } from "@/types/plan";
import { DateUtil } from "./DateUtil";

export type OrderList = Array<Array<Order>>

function getTitle(nickname: string): string {
  return nickname ? `${nickname}님의 여행` : "나만의 여행";
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