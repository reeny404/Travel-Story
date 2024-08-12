"use client";

import SvgIcon from "@/components/commons/SvgIcon";
import { useRouter } from "next/navigation";

function MyTrip() {
  const router = useRouter();

  const handleNavigatePlan = () => {
    router.push("/plan/create");
  };

  return (
    <div className="px-4 cursor-pointer" onClick={handleNavigatePlan}>
      <div className="flex justify-between items-center w-11/12 h-11 px-5 bg-primary text-brand-300 font-semibold mx-auto mt-7 rounded-lg">
        내 여행 일정 만들기
        <SvgIcon
          name="arrow-right"
          width={24}
          height={24}
          color="brand-400"
          title="arrow"
          hasStroke={true}
        />
      </div>
    </div>
  );
}

export default MyTrip;
