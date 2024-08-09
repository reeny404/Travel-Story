import { api } from "@/apis/api";
import { PlanChildData, PlanChildType, SupabaseMemoType, SupabaseMoveType, SupabaseScheduleType } from "@/types/plan";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type DataType = SupabaseScheduleType | SupabaseMoveType | SupabaseMemoType;

type Store = {
  planChildren: DataType[];
  fetchSchedule: (planId: string, day: number) => Promise<void>;
  createSchedule: (planId: string, day: number, type: PlanChildType, insertData: PlanChildData) => Promise<void>;
  updateScheduleCheck: (planId: string, day: number, itemId: string, checkIndex: number, isChecked: boolean) => Promise<void>;
}

const useScheduleStore = create<Store>()(
  persist(
    (set, get) => ({
      planChildren: [],
      fetchSchedule: async (planId: string, day: number) => {
        try {
          const response = await axios.get(`/api/plan/${planId}/schedule`, {
            params: { day },
          });

          set({
            planChildren: response.data.data
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

          const { fetchSchedule: fetchScheduleList } = get();
          fetchScheduleList(planId, day);
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

        const { fetchSchedule: fetchScheduleList } = get();
        fetchScheduleList(planId, day);
      }
    }),
    {
      name: "scheduleStore",
    }
  )
);

export default useScheduleStore;
