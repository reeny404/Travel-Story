"use client";

import { api } from "@/apis/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Account from "./Account";
import Suggestion from "./Suggestion";

function AccountList() {
  const { data: list, isPending } = useQuery({
    queryKey: ["plan", "my"],
    queryFn: () => api.plan.getMyPlans(),
  });

  if (isPending) {
    return <p className="mx-auto pt-10 text-center">로딩 중...</p>;
  }

  if (!list || !list.length) {
    return <Suggestion />;
  }

  return (
    <div className="flex flex-col space-y-4">
      {list.map((item) => (
        <Link key={item.id} href={`/account/${item.id}`}>
          <Account plan={item}></Account>
        </Link>
      ))}
    </div>
  );
}

export default AccountList;
