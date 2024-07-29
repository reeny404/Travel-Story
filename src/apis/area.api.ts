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
    console.log("response.data", response.data);

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

  // TODO 한글 이름 검색 시 가능하도록 업데이트 해야함.
  /**
   *
   * @param name {string} 영문 이름
   * @returns
   */
  async search(name: string): Promise<RecommendResponse<Area[]>> {
    const path = `/api/area/search`;
    const response = await this.axios.get<RecommendResponse<Area[]>>(path, {
      params: {
        name,
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

  async addBookmark(data: BookmarkType) {
    const { userId, areaId } = data;
    const path = "/api/area/bookmark";
    const response = await this.axios.post(path, { userId, areaId });

    console.log("response", response);
  }

  async deleteBookmark(data: BookmarkType) {
    const { userId, areaId } = data;
    const path = "/api/area/bookmark";
    const response = await this.axios.delete(path, {
      data: { userId, areaId },
    });

    console.log("response", response);
  }
}
type BookmarkType = {
  userId: string;
  areaId: number;
};
export default AreaAPI;
