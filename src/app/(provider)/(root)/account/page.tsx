"use client";

import { api } from "@/apis/api";
import Icon from "@/components/commons/Icon";
import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import { useQuery } from "@tanstack/react-query";
import Badge from "../../../../components/Badge";

const scheduleId = "cff1bd2a-6a3f-4eac-9a9f-b76db923b7de";
const types = ["현금", "이체", "체크", "신용"];

export default function AccountBookPage() {
  const { data: account, isLoading } = useQuery({
    queryKey: ["account"],
    queryFn: () => api.account.get(scheduleId),
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
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        leftIcons: [
          {
            icon: ICON.arrow.back.black,
            alt: "Back",
            path: "/",
            size: 20,
          },
        ],
        title: "가계부",
        titleAlign: "center",
      }}
    >
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
          <Icon icon={ICON.account.shop.black} alt="장소" size={24} />
          <span>La Caseta a Monti</span>
        </div>
        <div className="flex items-center space-x-6">
          <Icon icon={ICON.account.card.black} alt="결제타입" size={24} />
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
          <Icon icon={ICON.account.memo.black} alt="메모" size={24} />
          <span>{account.desc}</span>
        </div>
      </main>
    </MainLayout>
  );
}
