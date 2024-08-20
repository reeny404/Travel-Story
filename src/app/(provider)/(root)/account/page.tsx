"use client";

import { getIconPath } from "@/components/commons/Icon/getIconPath";
import SvgIcon from "@/components/commons/SvgIcon";
import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import { DateUtil } from "@/utils/DateUtil";
import { useMemo } from "react";
import AccountList from "./_components/AccountList";

const scheduleId = "cff1bd2a-6a3f-4eac-9a9f-b76db923b7de";
const types = ["현금", "이체", "체크", "신용"];

export default function AccountListPage() {
  const arrowIconPath = useMemo(() => getIconPath(ICON.arrow.down.black), []);

  // TODO 우선 READ로 페이지, 나중에 create/update 기능 추가

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "가계부 리스트",
        titleAlign: "center",
      }}
    >
      <div className="min-h-[calc(100dvh-52px)]">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg leading-6">
              {DateUtil.format("yyyy년 MM월 dd일", new Date())}
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-0.5 flex items-center justify-center text-sm rounded-full bg-gray-150">
                {/* TODO 정렬 미구현 */}
                최신순
                <SvgIcon name="arrow-down" width={16} height={16} />
              </button>
            </div>
          </div>
          <AccountList />
        </div>
      </div>
    </MainLayout>
  );
}
