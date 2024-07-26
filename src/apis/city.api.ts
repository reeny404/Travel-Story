import { Tables } from "@/types/supabase";
import { AxiosInstance } from "axios";

type CityType = Tables<"city">;

class CityAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getCities() {
    try {
      const path = "/api/city";
      const response = await this.axios.get<CityType>(path);

      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching data : ", error);
    }
  }

  /**
   *
   * @param id {number} 다수 : countryId or 한개 : id
   * @param isMultiple  {boolean} true : 다수 도시 or false : 한개 도시
   * @returns
   */
  async getCitiesById(id: number, isMultiple: boolean) {
    try {
      const path = `/api/city/${id}`;
      const response = await this.axios.get<CityType[] | CityType>(path, {
        params: {
          id,
          isMultiple,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching data : ", error);
    }
  }

  // TODO 한글로 검색 할 수 있도록 수정 필요
  /**
   *
   * @param name {string} 영문 이름
   * @returns
   */
  async search(name: string) {
    try {
      const path = `/api/city/search`;
      const response = await this.axios.get<CityType>(path, {
        params: {
          name,
        },
      });
      return response.data;
    } catch (error) {}
  }
}

export default CityAPI;
