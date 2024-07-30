import {
  AreaBookmark,
  BookmarkType,
  RecommendResponse,
} from "@/types/Recommend";
import { AxiosInstance } from "axios";

class BookmarkAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }
  // 유저 정보에 따른 북마크들을 가져옵니다.
  async getBookmarks(id: string): Promise<RecommendResponse<AreaBookmark[]>> {
    const path = "/api/bookmark";
    const response = await this.axios.get<RecommendResponse<AreaBookmark[]>>(
      path,
      { params: { id } }
    );
    const data = response.data;
    return data;
  }

  async addBookmark(
    data: BookmarkType
  ): Promise<RecommendResponse<AreaBookmark>> {
    const { userId, areaId } = data;
    const path = "/api/bookmark";
    const response = await this.axios.post<RecommendResponse<AreaBookmark>>(
      path,
      { userId, areaId }
    );
    return response.data;
  }

  async deleteBookmark(
    data: BookmarkType
  ): Promise<RecommendResponse<AreaBookmark>> {
    const { userId, areaId } = data;
    const path = "/api/bookmark";
    const response = await this.axios.delete<RecommendResponse<AreaBookmark>>(
      path,
      {
        data: { userId, areaId },
      }
    );
    return response.data;
  }
}

export default BookmarkAPI;
