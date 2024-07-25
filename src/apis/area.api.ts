import { Tables } from "@/types/supabase";
import { AxiosInstance } from "axios";

type AreaType = Tables<"area">;

class AreaAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getAreas() {
    try {
      const path = "/api/area";
      const response = await this.axios.get<AreaType>(path);
      const data = response.data;

      return data;
    } catch (error) {
      console.error("Error fetching data : ", error);
    }
  }

  /**
   *
   * @param id {number} cityId or id
   * @param isMultiple  {boolean} 다수 지역 or 한개의 지역
   * @returns
   */
  async getAreasById(id: number, isMultiple: boolean) {
    try {
      const path = `/api/area/${id}`;
      const response = await this.axios.get<AreaType[] | AreaType>(path, {
        params: {
          id,
          isMultiple,
        },
      });

      const data = response.data;
      return data;
    } catch (error) {
      console.log("Error fetching data : ", error);
    }
  }

  // TODO 한글 이름 검색 시 가능하도록 업데이트 해야함.
  /**
   *
   * @param name {string} 영문 이름
   * @returns
   */
  async search(name: string) {
    try {
      const path = `/api/area/search`;
      const response = await this.axios.get<AreaType>(path, {
        params: {
          name,
        },
      });
      const data = response.data;

      return data;
    } catch (error) {}
  }
}

export default AreaAPI;
