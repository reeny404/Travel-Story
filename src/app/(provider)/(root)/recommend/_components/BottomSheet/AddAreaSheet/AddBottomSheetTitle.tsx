"use client";

import { api } from "@/apis/api";
import { getIconPath } from "@/components/commons/Icon/getIconPath";
import { ICON } from "@/constants/icon";
import { useAuth } from "@/contexts/auth.contexts";
import { PlanData } from "@/types/plan";
import { PlanUtil } from "@/utils/PlanUtil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import BottomSheetTitle from "../BottomSheetTitle";

type AddBottomSheetTitle = {
  areaId: number;
  isPlan: boolean;
  onClose: () => void;
};

function AddBottomSheetTitle({ areaId, isPlan, onClose }: AddBottomSheetTitle) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: addPlan, isPending } = useMutation({
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
      title: PlanUtil.getTitle(user?.user_metadata),
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
    addPlan(data);
  };
  return (
    <div className="w-full flex justify-between items-center mb-7 px-4">
      <BottomSheetTitle
        title={isPlan ? "어디에 추가하시겠어요?" : "새 일정을 만들어 주세요."}
        onClose={onClose}
      />
      {isPending && <div></div>}
      <button
        type="button"
        onClick={handleAddPlan}
        className="flex items-center gap-x-1 min-w-[88px] h-7 pl-2 md:ml-2 text-white bg-neutral-750 hover:opacity-90 active:opacity-80 text-sm font-medium rounded-[16px]"
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
