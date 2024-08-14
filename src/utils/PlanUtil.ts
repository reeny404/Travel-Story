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

function initOrderList(
  startDate: string | undefined | null,
  endDate: string | undefined | null
): OrderList {
  const gapDay = DateUtil.getGapDayByString(startDate ?? "", endDate ?? "");
  return new Array(gapDay ? gapDay : 1).fill(0).map(() => new Array<Order>());
}

const calculateDuration = (
  startTime: string | null,
  endTime: string | null
): string => {
  if (startTime && endTime) {
    const start = new Date(`2024-01-01T${startTime}`);
    const end = new Date(`2024-01-01T${endTime}`);
    const duration = Math.ceil((end.getTime() - start.getTime()) / 60000); // 분 단위로 계산
    return `${duration}분`;
  }
  return "";
};

const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes}`;
};

export const PlanUtil = {
  getTitle,
  order: {
    init: initOrderList,
  },
  calculateDuration,
  formatTime,
};
