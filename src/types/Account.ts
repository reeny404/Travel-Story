export type AccountType = "지출" | "수입";
export type PayType = "현금" | "이체" | "체크" | "신용";

export type Account = {
  type: AccountType,
  payType: PayType,
  amount: number,
  desc: string
  areaType: string,
  areaName: string,
};