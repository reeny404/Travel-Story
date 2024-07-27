"use client";

import { api } from "@/apis/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Plan from "./Plan";

function PlanList() {
  const { data: list, isLoading } = useQuery({
    queryKey: ["plan"],
    queryFn: () => api.plan.getMyPlans(),
  });

  if (isLoading) {
    return "로딩 중";
  }
  if (!list) {
    return "데이터 없음";
  }

  return (
    <div className="space-y-4">
      {list.map((item) => (
        <Link key={item.id} href={`/plan/${item.id}`}>
          <Plan plan={item}></Plan>
        </Link>
      ))}
    </div>
  );
}

export default PlanList;
