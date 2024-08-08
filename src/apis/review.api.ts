import { AreaReview, RecommendResponse } from "@/types/Recommend";
import { AxiosInstance } from "axios";

class ReviewAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  // areaId에 합치하는 리뷰들을 가져옵니다.
  async getReviews(id: number): Promise<RecommendResponse<AreaReview[]>> {
    const path = `api/review`;
    const response = await this.axios.get<RecommendResponse<AreaReview[]>>(
      path,
      {
        params: {
          id,
        },
      }
    );
    const data = response.data;
    return data;
  }

  async getReviewsByUser(id: string): Promise<RecommendResponse<AreaReview[]>> {
    const path = `api/review/${id}`;
    const response = await this.axios.get<RecommendResponse<AreaReview[]>>(
      path,
      {
        params: {
          id: id,
        },
      }
    );
    const data = response.data;
    return data;
  }

  async addReview(data: any) {
    const path = "api/review";
    const response = await this.axios.post(path, data);
    return response.data;
  }
  async updateReview(data: any) {
    const path = "api/review";
    const response = await this.axios.put(path, data);
    return response.data;
  }
  async deleteReview(id: number) {
    const path = "api/review";
    await this.axios.delete(path, { data: { id } });
    console.log("id", id);
  }
}

export default ReviewAPI;
