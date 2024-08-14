import { AreaReview, RecommendResponse } from "@/types/Recommend";
import { AxiosInstance } from "axios";

class ReviewAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getReviews(id: number): Promise<RecommendResponse<AreaReview[]>> {
    try {
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
    } catch (error: any) {
      throw new error();
    }
  }

  async getReviewsByUser(id: string): Promise<RecommendResponse<AreaReview[]>> {
    try {
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
    } catch (error: any) {
      throw new error();
    }
  }

  async addReview(data: FormData) {
    try {
      const path = "api/review";
      const response = await this.axios.post(path, data);
      return response.data;
    } catch (error: any) {
      throw new error();
    }
  }
  async updateReview(data: FormData) {
    try {
      const path = "api/review";
      const response = await this.axios.put(path, data);
      return response.data;
    } catch (error: any) {
      throw new error();
    }
  }
  async deleteReview({ id, areaId }: { id: number; areaId: number }) {
    try {
      const path = "api/review";
      await this.axios.delete(path, { data: { id, areaId } });
    } catch (error: any) {
      throw new error();
    }
  }
}

export default ReviewAPI;
