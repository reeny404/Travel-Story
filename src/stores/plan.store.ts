import { api } from "@/apis/api";
import { Plan } from "@/types/plan";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PlanStoreProps = {
  plans: Plan[];
  fetchPlans: () => Promise<void>;
  deletePlan: (planId: string) => Promise<void>;
};
const usePlanStore = create<PlanStoreProps>()(
  persist((set, get) => ({
    plans: [],
    fetchPlans: async () => {
      const plans = await api.plan.getMyPlans();
      set({ plans });
    },
    deletePlan: async (planId: string) => {
      await api.plan.delete(planId);

      const { fetchPlans } = get();
      fetchPlans();
    }
  }), { name: "PlanStore" }));

  export default usePlanStore;