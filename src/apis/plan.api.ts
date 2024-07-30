import { Tables } from "@/types/supabase";
import { AxiosInstance } from "axios";

export default class PlanAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getMyPlans() {
    return await this.axios
      .get<Tables<"plan">[]>(`/api/plan`)
      .then(({ data }) => data)
      .catch((e) => {
        console.error(e);
        return [];
      });
  }

  async updatePlan(planId: string, updatedData: Record<string, any>) {
    return await this.axios
      .put(`/api/plan/${planId}/schedule`, updatedData)
      .then(({ data }) => data)
      .catch((e) => {
        console.error(e);
        return null;
      });
  }

  async addPlan(planId: string, newData: Record<string, any>) {
    return await this.axios
      .post(`/api/plan/${planId}/schedule`, newData)
      .then(({ data }) => data)
      .catch((e) => {
        console.error(e);
        return null;
      });
  }
}
