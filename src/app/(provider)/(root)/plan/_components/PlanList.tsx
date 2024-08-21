"use client";

import usePlanStore from "@/stores/plan.store";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Plan from "./Plan";
import Suggestion from "./Suggestion";

function PlanList() {
  const [isInit, setIsInit] = useState<boolean>(false);
  const { plans, fetchPlans } = usePlanStore();

  useEffect(() => {
    if (!isInit || !plans.length) {
      fetchPlans();
    }
    setIsInit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isInit) {
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
