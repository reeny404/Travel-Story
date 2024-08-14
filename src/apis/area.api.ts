import { Area, GroupedArea, RecommendResponse } from "@/types/Recommend";
import { Tables } from "@/types/supabase";
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
    try {
      const path = "/api/area";
      const response = await this.axios.get<RecommendResponse<Area[]>>(path);
      const data = response.data;

      return data;
    } catch (error: any) {
      throw new error();
    }
  }

  /**
   *
   * @param id {number} cityId or id
   * @returns
   */
  async getAreasById(id: number): Promise<RecommendResponse<Area>> {
    try {
      const path = `/api/area/${id}`;
      const response = await this.axios.get<RecommendResponse<Area>>(path, {
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
   * @param id {number} cityId
   * @returns
   */
  async getAreasByCity(
    id: number,
    limit: number | null
  ): Promise<RecommendResponse<GroupedArea>> {
    try {
      const path = `/api/area/city`;
      const response = await this.axios.get<RecommendResponse<GroupedArea>>(
        path,
        {
          params: {
            id,
            limit,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error: any) {
      throw new error();
    }
  }

  /**
   *
   * @param id {number} cityId
   * @param type {string} areaType
   * @returns
   */
  async getAreasByCountry(
    id: number,
    limit: number | null
  ): Promise<RecommendResponse<GroupedArea>> {
    try {
      const path = `/api/area/country`;
      const response = await this.axios.get<RecommendResponse<GroupedArea>>(
        path,
        {
          params: {
            id,
            limit,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new error();
    }
  }

  /**
   *
   * @param term {string} 검색어
   *  @param countryId {string} 국가 id
   * @returns 검색 결과
   */

  async search(
    term: string,
    countryId?: string
  ): Promise<RecommendResponse<Area[]>> {
    const path = `/api/area/search`;
    const response = await this.axios.get<RecommendResponse<Area[]>>(path, {
      params: {
        term,
        ...(countryId && { country: countryId }),
      },
    });

    const data = response.data;
    return data;
  }

  // 메인 페이지에서 사용되는 카테고리 별 관광지 정보
  async getAreasByCategory(): Promise<
    RecommendResponse<{ [key: string]: Area[] }>
  > {
    try {
      const path = "/api/area/category";
      const response =
        await this.axios.get<RecommendResponse<{ [key: string]: Area[] }>>(
          path
        );
      const data = response.data;

      return data;
    } catch (error: any) {
      throw new error();
    }
  }

  // TODO 아래 두 메서드 Plan쪽으로 옮겨야댐
  async getPlan(userId: string) {
    try {
      const path = `api/area/plan`;
      const response = await this.axios.get(path, {
        params: {
          userId,
        },
      });
      return response.data.length === 0 ? null : response.data;
    } catch (error: any) {
      throw new error();
    }
  }

  async addPlan(data: Partial<PlanType>) {
    try {
      const path = `api/area/plan`;
      const response = await this.axios.post<PlanType>(path, data);
      return response.data;
    } catch (error: any) {
      throw new error();
    }
  }

  async addSchedule(data: any) {
    try {
      const path = "api/area/schedule";
      const response = await this.axios.post<Schedule>(path, data);
    } catch (error: any) {
      throw new error();
    }
  }
}
type PlanType = Tables<"plan">;
type Schedule = Tables<"schedule"> & Tables<"plan">;

export default AreaAPI;
