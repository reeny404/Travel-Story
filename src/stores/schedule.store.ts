import { api } from "@/apis/api";
import { PlanChildData, PlanChildType, SupabaseMemoType, SupabaseMoveType, SupabaseScheduleType } from "@/types/plan";
import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Day = {
  day: number;
  schedules: Array<SupabaseScheduleType | SupabaseMoveType | SupabaseMemoType>;
}


type Store = {
  plan: Day[];
  fetchPlan: (planId: string, day: number, refresh?: boolean) => Promise<void>;
  createSchedule: (planId: string, day: number, type: PlanChildType, insertData: PlanChildData) => Promise<void>;
  updateScheduleCheck: (planId: string, day: number, itemId: string, checkIndex: number, isChecked: boolean) => Promise<void>;
  updateSchedule: (planId: string, day: number, type: PlanChildType, data: PlanChildData) => Promise<void>;
}

const useScheduleStore = create<Store>()(
  immer(
    (set, get) => ({
      plan: [],
      fetchPlan: async (planId: string, day: number, refresh?: boolean) => {
        try {
          const { plan: planChildren } = get();
          if (!refresh && planChildren[day - 1]?.schedules?.length) {
            return;
          }

          const response = await axios.get(`/api/plan/${planId}/schedule`, {
            params: { day },
          });

          set((prev) => {
            prev.plan[day - 1] = {
              day: day,
              schedules: response.data.data
            };
          })
        } catch (error) {
          console.error("일정 데이터를 가져오는 중 오류 발생:", error);
        }
      },
      createSchedule: async (planId: string, day: number, type: PlanChildType, insertData: PlanChildData) => {
        try {
          const response = await api.plan.addChild(planId, day, type, insertData);
          if (!response) {
            console.error("Error adding data");
            return;
          }

          const { fetchPlan: fetchScheduleList } = get();
          fetchScheduleList(planId, day, true);
        } catch (error) {
          console.error("Error adding data:", error);
        }
      },
      updateScheduleCheck: async (planId: string, day: number, itemId: string, checkIndex: number, isChecked: boolean) => {
        await axios.put(`/api/plan/${planId}/check`, {
          itemId,
          checkIndex,
          isChecked: !isChecked,
        });

        const { fetchPlan: fetchScheduleList } = get();
        fetchScheduleList(planId, day, true);
      },
      updateSchedule: async (planId: string, day: number, type: PlanChildType, data: PlanChildData) => {
        await api.plan.updatePlan(planId, type, data);

        const { fetchPlan: fetchScheduleList } = get();
        fetchScheduleList(planId, day, true);
      }
    })
  )
);

export default useScheduleStore;
