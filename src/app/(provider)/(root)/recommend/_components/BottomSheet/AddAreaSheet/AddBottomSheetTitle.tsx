"use client";

import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { PlanData } from "@/types/plan";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    <div className="w-full h-full flex justify-between items-center p-1">
      <h1 className="w-full h-full flex items-center p-1 text-lg outline-none bg-white font-bold">
        장소를 추가할 일정이 없어요.
      </h1>

      <button
        type="button"
        onClick={handleAddPlan}
        className="w-24 h-full text-sm rounded-xl p-1 bg-blue-300 "
      >
        내 여행
      </button>
    </div>
  );
}

export default AddBottomSheetTitle;
