"use client";

import { api } from "@/apis/api";
import { getIconPath } from "@/components/commons/Icon/getIconPath";
import { ICON } from "@/constants/icon";
import { useAuth } from "@/contexts/auth.contexts";
import { PlanData } from "@/types/plan";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

function AddBottomSheetTitle({ areaId }: { areaId: number }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: addPlan } = useMutation({
    mutationFn: async (data: PlanData) => {
      const response = await api.area.addPlan(data);
      return response;
    },
    onError: (error) => {
      console.error("Error adding data:", error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["planData"] });
      return data;
    },
  });

  const handleAddPlan = async () => {
    if (!user) {
      return;
    }
    const data = {
      userId: user.id,
      areaId: areaId,
      title: `${user?.user_metadata.nickname}님의 여행`,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
    addPlan(data);
  };
  return (
    <div className="w-full h-full flex justify-between items-center">
      <h1 className="w-full h-full flex items-center p-1 text-lg outline-none bg-white font-bold">
        새 일정을 만들어 주세요.
      </h1>

      <button
        type="button"
        onClick={handleAddPlan}
        className="flex items-center gap-x-1 min-w-[88px] h-7 pl-2 text-white text-sm font-medium rounded-[16px] bg-[#2A2A2A]"
      >
        <Image
          src={getIconPath(ICON.add.bold)}
          alt="add"
          width={20}
          height={20}
          className="hover:cursor-pointer object-contain"
        />
        <p>내 여행</p>
      </button>
    </div>
  );
}

export default AddBottomSheetTitle;
