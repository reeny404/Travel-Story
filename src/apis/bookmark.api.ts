import {
  AreaBookmark,
  BookmarkAPIType,
  extendBookmark,
  RecommendResponse,
} from "@/types/Recommend";
import { AxiosInstance } from "axios";

class BookmarkAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }
  // 유저 정보에 따른 북마크들을 가져옵니다.
  async getBookmarks(): Promise<RecommendResponse<extendBookmark[]>> {
    try {
      const path = "/api/bookmark";
      const response =
        await this.axios.get<RecommendResponse<extendBookmark[]>>(path);
      const data = response.data;

      return data;
    } catch (error: any) {
      throw new error();
    }
  }

  async addBookmark(
    data: BookmarkAPIType
  ): Promise<RecommendResponse<AreaBookmark>> {
    try {
      const { areaId } = data;
      const path = "/api/bookmark";
      const response = await this.axios.post<RecommendResponse<AreaBookmark>>(
        path,
        { areaId }
      );
      return response.data;
    } catch (error: any) {
      throw new error();
    }
  }

  async deleteBookmark(
    data: BookmarkAPIType
  ): Promise<RecommendResponse<AreaBookmark>> {
    try {
      const { areaId } = data;
      const path = "/api/bookmark";
      const response = await this.axios.delete<RecommendResponse<AreaBookmark>>(
        path,
        {
          data: { areaId },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new error();
    }
  }
}

export default BookmarkAPI;
