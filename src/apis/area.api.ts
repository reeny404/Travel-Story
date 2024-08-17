import { Area, GroupedArea, RecommendResponse } from "@/types/Recommend";
import { SearchResponse, SearchResultsType } from "@/types/search";
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
   * @returns
   */
  async getAllAreasByCity(id: number): Promise<RecommendResponse<Area[]>> {
    try {
      const path = `/api/area/city/allCategory`;
      const response = await this.axios.get<RecommendResponse<Area[]>>(path, {
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
   * @param countryId {string} 국가 id
   * @param currentPage {number} 현재 페이지 (더보기 클릭 시 증가)
   * @param limit {number} 한번에 가져올 데이터 수 (초기 3개, 이후 5개씩)
   * @param category {string} 카테고리별 필터 (place, restaurant, etc.)
   * @returns 검색 결과
   */

  async search(
    term: string,
    countryId?: string,
    currentPage: number = 1,
    limit: number = 3,
    category: string = ""
  ): Promise<SearchResponse<SearchResultsType>> {
    const path = `/api/area/search`;
    const response = await this.axios.get<SearchResponse<SearchResultsType>>(
      path,
      {
        params: {
          term,
          country: countryId,
          currentPage,
          limit,
          category,
        },
      }
    );

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
