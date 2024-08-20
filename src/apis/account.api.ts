import { Account } from "@/types/Account";
import { AxiosInstance } from "axios";

export class AccountAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getAccount(scheduleId: string) {
    return await this.axios
      .get<Account>(`/api/account?scheduleId=${scheduleId}`)
      .then(({ data }) => data)
      .catch((e) => console.error(e));
  }

  async getAccounts(planId: string) {
    return await this.axios
      .get<Account[]>(`/api/accounts?planId=${planId}`)
      .then(({ data }) => data)
      .catch((e) => console.error(e));
  }

  async createAccount(newAccount: Account): Promise<Account> {
    try {
      const { data } = await this.axios.post<Account>(
        `/api/account`,
        newAccount
      );
      if (!data) {
        throw new Error("가계부 생성 에러");
      }
      return data;
    } catch (e) {
      console.error("가계부 생성 에러:", e);
      throw e;
    }
  }

  async updateAccount(id: string, updatedAccount: Account) {
    try {
      const { data } = await this.axios.put<Account>(
        `/api/account/${id}`,
        updatedAccount
      );
      return data;
    } catch (e) {
      console.error("Error updating account:", e);
    }
  }

  async deleteAccount(id: string): Promise<void> {
    try {
      await this.axios.delete(`/api/account/${id}`);
    } catch (e) {
      console.error("Error deleting account:", e);
    } finally {
      console.log("완료");
    }
  }

  async getSchedule(scheduleId: string) {
    return await this.axios
      .get(`/api/schedule/${scheduleId}`)
      .then(({ data }) => data)
      .catch((e) => console.error(e));
  }
}
