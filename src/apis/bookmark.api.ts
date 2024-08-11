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
    const path = "/api/bookmark";
    const response =
      await this.axios.get<RecommendResponse<extendBookmark[]>>(path);
    const data = response.data;

    return data;
  }

  async addBookmark(
    data: BookmarkAPIType
  ): Promise<RecommendResponse<AreaBookmark>> {
    const { areaId } = data;
    console.log("areaId", areaId);
    const path = "/api/bookmark";
    const response = await this.axios.post<RecommendResponse<AreaBookmark>>(
      path,
      { areaId }
    );
    console.log("response.data", response.data);
    return response.data;
  }

  async deleteBookmark(
    data: BookmarkAPIType
  ): Promise<RecommendResponse<AreaBookmark>> {
    const { areaId } = data;
    const path = "/api/bookmark";
    const response = await this.axios.delete<RecommendResponse<AreaBookmark>>(
      path,
      {
        data: { areaId },
      }
    );
    return response.data;
  }
}

export default BookmarkAPI;
