import { Tables } from "@/types/supabase";
import { AxiosInstance } from "axios";

export class AccountAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async get(scheduleId: string) {
    return await this.axios
      .get<Tables<"accountBook">>(`/api/account?scheduleId=${scheduleId}`)
      .then(({ data }) => data)
      .catch((e) => console.error(e));
  }
}
