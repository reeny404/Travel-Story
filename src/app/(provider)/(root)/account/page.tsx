"use client";

import { BASE_URL, QUERY_KEY } from "@/constants/QueryKey";
import { Account } from "@/types/Account";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Badge from "../../../../components/Badge";

const scheduleId = "cff1bd2a-6a3f-4eac-9a9f-b76db923b7de";
const types = ["현금", "이체", "체크", "신용"];

export default function AccountBookPage() {
  const { data: account, isLoading } = useQuery<Account>({
    queryKey: [QUERY_KEY.account],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/api/account?scheduleId=${scheduleId}`)
        .then(({ data }) => data),
  });

  if (isLoading) {
    // TODO 로딩 UI 변경
    return "로딩 중";
  }
  if (!account) {
    return "데이터 없음";
  }

  // TODO 우선 READ로 페이지, 나중에 create/update 기능 추가

  return (
    <div className="w-full max-w-md mx-auto border bg-white">
      {/* TODO 나중에 헤더 삭제 START */}
      <header className="flex items-center justify-between p-4 border-b">
        <button className="text-lg">
          <span className="w-6 h-6">←</span>
        </button>
        <h1 className="text-lg font-medium">가계부</h1>
        <div className="w-6 h-6" />
      </header>
      {/* 나중에 헤더 삭제 END */}
      <main className="p-4 space-y-8">
        <div className="text-3xl font-bold">
          <span className="text-2xl">₩</span> {account.amount}
          {/* TODO amount 1,000 콤마 찍어줘야함 */}
        </div>
        <div className="flex justify-between text-center text-gray-500">
          {/* TODO 기능 추가 : 클릭 가능한 요소 */}
          <span className="w-1/2">지출</span>
          <span className="w-1/2">수입</span>
        </div>
        <div className="flex items-center space-x-6">
          {/* TODO 장소 아이콘, 타입에 따라 여러가지로 보일 수 있도록 */}
          <span className="w-6 h-6 text-center">■</span>
          <span>식당</span>
        </div>
        <div className="flex items-center space-x-6">
          <Image
            src="/icon/shop.svg"
            alt="장소 아이콘"
            width="24"
            height="24"
          />
          <span>La Caseta a Monti</span>
        </div>
        <div className="flex items-center space-x-6">
          <Image
            src="/icon/card.svg"
            alt="결제 타입 아이콘"
            width="24"
            height="24"
          />
          <div className="flex space-x-2">
            {types.map((type, i) => (
              <Badge
                key={i}
                intent={account.type === type ? "active" : "default"}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Image
            src="/icon/memo.svg"
            alt="메모 아이콘"
            width="24"
            height="24"
          />
          <span>{account.desc}</span>
        </div>
      </main>
    </div>
  );
}
