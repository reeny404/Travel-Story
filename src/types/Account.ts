export type AccountType = "지출" | "수입";
export type PayType = "현금" | "이체" | "체크" | "신용";

export type Account = {
  id?: number | string;
  createdAt?: string;
  desc: string;
  planId?: string;
  scheduleId: string;
  type: AccountType;
  payType: PayType;
  amount: number;
  area?: string;
};
