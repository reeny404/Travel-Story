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
      .catch(e => {
        console.error(e);
        return [];
      });
  }
}