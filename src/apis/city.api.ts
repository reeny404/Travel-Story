import { City, RecommendResponse } from "@/types/Recommend";
import { AxiosInstance } from "axios";

class CityAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getCities(): Promise<RecommendResponse<City[]>> {
    try {
      const path = "/api/city";
      const response = await this.axios.get<RecommendResponse<City[]>>(path);

      const data = response.data;
      return data;
    } catch (error: any) {
      throw new error();
    }
  }

  /**
   *
   * @param id {number} cityId
   * @returns
   */
  async getCityById(id: number): Promise<RecommendResponse<City>> {
    try {
      const path = `/api/city/${id}`;
      const response = await this.axios.get<RecommendResponse<City>>(path, {
        params: {
          id,
        },
      });

      const data = response.data;

      return data;
    } catch (error: any) {
      throw new error();
    }
  }

  /**
   *
   * @param id {number} countryId
   * @returns
   */
  async getCitiesByCountry(id: number): Promise<RecommendResponse<City[]>> {
    try {
      const path = `/api/city/country`;
      const response = await this.axios.get<RecommendResponse<City[]>>(path, {
        params: {
          id,
        },
      });
      const data = response.data;

      return data;
    } catch (error: any) {
      throw new error();
    }
  }

  // TODO 한글로 검색 할 수 있도록 수정 필요
  /**
   *
   * @param name {string} 영문 이름
   * @returns
   */
  async search(name: string): Promise<RecommendResponse<City[]>> {
    try {
      const path = `/api/city/search`;
      const response = await this.axios.get<RecommendResponse<City[]>>(path, {
        params: {
          name,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new error();
    }
  }
}

export default CityAPI;
