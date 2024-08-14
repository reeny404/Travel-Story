"use client";

import { api } from "@/apis/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Loading from "./Loading";
import Plan from "./Plan";
import Suggestion from "./Suggestion";

function PlanList() {
  const { data: plans, isPending } = useQuery({
    queryKey: ["plan", "my"],
    queryFn: () => api.plan.getMyPlans(),
  });

  if (isPending) {
    return <Loading />;
  }

  if (!plans?.length) {
    return <Suggestion />;
  }

  return (
    <div className="flex flex-col space-y-4">
      {plans.map((plan) => (
        <Link key={plan.id} href={`/plan/${plan.id}`}>
          <Plan plan={plan}></Plan>
        </Link>
      ))}
    </div>
  );
}

export default PlanList;
