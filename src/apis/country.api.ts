import { Country, RecommendResponse } from "@/types/Recommend";
import { AxiosInstance } from "axios";

export const countryAPI = {};

class CountryAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getCountries(): Promise<RecommendResponse<Country[]>> {
    try {
      const path = "/api/country";
      const response = await this.axios.get<RecommendResponse<Country[]>>(path);

      const data = response.data;
      return data;
    } catch (error: any) {
      throw new error();
    }
  }

  async getCountry(id: number): Promise<RecommendResponse<Country>> {
    try {
      const path = `/api/country/${id}`;
      const response = await this.axios.get<RecommendResponse<Country>>(path, {
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

  async getSortedCountries(): Promise<Country[]> {
    try {
      const path = "/api/country/drawer";
      const response = await this.axios.get<Country[]>(path);

      const data = response.data;
      return data;
    } catch (error: any) {
      throw new error();
    }
  }

  // 인기 여행지(추후 필터 적용 시점에 분리할 예정)
  async getPopularCountries(): Promise<RecommendResponse<Country[]>> {
    try {
      const path = "/api/country/popular";
      const response = await this.axios.get<RecommendResponse<Country[]>>(path);

      const data = response.data;
      return data;
    } catch (error: any) {
      throw new error();
    }
  }

  async search(name: string): Promise<RecommendResponse<Country[]>> {
    try {
      const path = `/api/country/search`;
      const response = await this.axios.get<RecommendResponse<Country[]>>(
        path,
        {
          params: {
            name,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error: any) {
      throw new error();
    }
  }
}

export default CountryAPI;
