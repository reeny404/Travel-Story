export type AccountType = "현금" | "이체" | "체크" | "신용";

export type Account = { amount: number, type: AccountType, content: string };