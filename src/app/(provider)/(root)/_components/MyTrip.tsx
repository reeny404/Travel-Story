"use client";

import Icon from "@/components/commons/Icon";
import { ICON } from "@/constants/icon";
import { useRouter } from "next/navigation";

function MyTrip() {
  const router = useRouter();

  const handleNavigatePlan = () => {
    router.push("/plan");
  };

  return (
    <div className="px-4 cursor-pointer" onClick={handleNavigatePlan}>
      <div className="flex justify-between items-center w-11/12 h-11 pl-5 pr-[10px] bg-[#2A2A2A] text-[#D5EC41] font-semibold mx-auto mt-7 rounded-lg">
        내 여행 일정 만들기
        <Icon icon={ICON.arrow.foward.lightgreen} alt="arrow" size={24} />
      </div>
    </div>
  );
}

export default MyTrip;
