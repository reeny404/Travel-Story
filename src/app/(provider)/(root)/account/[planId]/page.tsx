"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useMemo } from "react";

type AccountBookProps = { params: { planId: string } };

function AccountBookPage({ params: { planId } }: AccountBookProps) {
  const { data: list, isLoading } = useQuery({
    queryKey: ["accounts", planId],
    queryFn: () => api.account.getAccounts(planId),
  });

  useEffect(() => {
    if (list) {
      console.log("Fetched data:", list);
    }
  }, [list]);

  // 총 지출 계산
  const totalAmount = useMemo(() => {
    return (
      list?.reduce((total: number, item: any) => total + item.amount, 0) || 0
    );
  }, [list]);

  if (isLoading) {
    return <p className="mx-auto pt-10 text-center">로딩 중...</p>;
  }

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: planId,
        titleAlign: "center",
      }}
    >
      <div className="h-14 w-full fixed bg-white bottom-0 left-0 shadow-lg shadow-black">
        <div className="mx-auto max-w-[1366px] flex items-center justify-between px-3 h-full">
          <h3 className="text-lg">총 지출: {totalAmount.toLocaleString()}</h3>
          <Link
            href={`/plan/` + planId}
            className="px-4 py-1 bg-neutral-600 text-white rounded-lg"
          >
            내 여행
          </Link>
        </div>
      </div>
      <div className="min-h-[calc(100dvh-52px)]">
        {}

        {list?.length ? (
          list?.map((item: any, index: number) => (
            <Link
              href={`/accountDetail/` + item.scheduleId}
              key={index}
              className="border-b border-neutral-200 h-16 flex items-center justify-between px-3"
            >
              <div className="flex items-center">
                <h3>{item.area}</h3>
                <span className="block px-3 ph-2 ml-2 text-sm border border-info-600 text-info-600 rounded-lg">
                  {item.payType}
                </span>
              </div>
              <p>
                <span>{item.amount}</span>원
              </p>
            </Link>
          ))
        ) : (
          <div className="text-center leading-10">
            <p>가계부를 내 여행에서 만들어주세요!</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default AccountBookPage;
