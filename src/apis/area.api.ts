import { Area, Rating, RecommendResponse } from "@/types/Recommend";
import { AxiosError, AxiosInstance } from "axios";
type RatingResponse = {
  status: number;
  message: string;
  data: { rating: number; pieces: number };
  error: null | AxiosError;
};

class AreaAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getAreas(): Promise<RecommendResponse<Area[]>> {
    const path = "/api/area";
    const response = await this.axios.get<RecommendResponse<Area[]>>(path);
    const data = response.data;

    return data;
  }

  /**
   *
   * @param id {number} cityId or id
   * @param isMultiple  {boolean} 다수 지역 or 한개의 지역
   * @returns
   */
  async getAreasById(id: number): Promise<RecommendResponse<Area>> {
    const path = `/api/area/${id}`;
    const response = await this.axios.get<RecommendResponse<Area>>(path, {
      params: {
        id,
      },
    });

    const data = response.data;
    return data;
  }

  /**
   *
   * @param id {number} cityId
   * @returns
   */
  async getAreasByCity(id: number): Promise<RecommendResponse<Area[]>> {
    const path = `/api/area/city`;
    const response = await this.axios.get<RecommendResponse<Area[]>>(path, {
      params: {
        id,
      },
    });
    const data = response.data;
    return data;
  }

  /**
   *
   * @param id {number} cityId
   * @param type {string} areaType
   * @returns
   */
  async getAreasByCountry(
    id: number,
    type: string
  ): Promise<RecommendResponse<Area[]>> {
    const path = `/api/area/country`;
    const response = await this.axios.get<RecommendResponse<Area[]>>(path, {
      params: {
        id,
        type,
      },
    });
    return response.data;
  }

  /**
   *
   * @param query 검색어
   * @returns 검색 결과
   */
  async search(query: string): Promise<RecommendResponse<Area[]>> {
    const path = `/api/area/search`;
    const response = await this.axios.get<RecommendResponse<Area[]>>(path, {
      params: {
        query,
      },
    });

    const data = response.data;
    return data;
  }

  async getAreaRating(id: number): Promise<RatingResponse | undefined> {
    try {
      const path = `/api/area/rating`;
      const response = await this.axios.get<RecommendResponse<Rating>>(path, {
        params: {
          id,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error();
    }
  }
}

export default AreaAPI;
