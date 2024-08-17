import { Plan, PlanChildData, PlanChildType, PlanFull, PlanInsertType } from "@/types/plan";
import { AxiosInstance } from "axios";

export default class PlanAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  /**
   * create Plan
   */
  async create(plan: PlanInsertType): Promise<Plan | null> {
    return await this.axios
      .post("/api/plan", plan)
      .then(({ data }) => data)
      .catch((e) => console.error(e));
  }

  async getMyPlans(): Promise<Plan[]> {
    return await this.axios
      .get<Plan[]>(`/api/plan`)
      .then(({ data }) => data)
      .catch((e) => {
        console.error(e);
        return [];
      });
  }

  async updatePlan(planId: string, type: PlanChildType, data: PlanChildData): Promise<Plan | null> {
    return await this.axios
      .put(`/api/plan/${planId}`, { ...data, type })
      .then(({ data }) => data)
      .catch((e) => {
        console.error(e);
        return null;
      });
  }

  async delete(planId: string): Promise<Plan | null> {
    return await this.axios
      .delete(`/api/plan/${planId}`)
      .then(({ data }) => data)
      .catch((e) => {
        console.error(e);
        return null;
      });
  }

  async addPlan(planId: string, newData: Record<string, any>): Promise<Plan | null> {
    return await this.axios
      .post(`/api/plan/${planId}/schedule`, newData)
      .then(({ data }) => data)
      .catch((e) => {
        console.error(e);
        return null;
      });
  }

  /**
   * create schedule or moveSchedule or ....
   */
  async addChild(planId: string, dayIndex: number, type: PlanChildType, newData: PlanChildData): Promise<Plan | null> {
    return await this.axios
      .post(`/api/plan/${planId}`, { type, dayIndex, data: newData })
      .then(({ data }) => data)
      .catch((e) => console.error(e));
  }

  async find(planId: string, day: number = 1): Promise<PlanFull> {
    return await this.axios
      .get(`/api/plan/${planId}?day=${day}`)
      .then(({ data }) => data.data)
      .catch((e) => {
        console.error(e);
        return [];
      });
  }
}
