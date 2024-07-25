import { Tables } from "@/types/supabase";
import axios, { AxiosInstance } from "axios";

type CountryType = Tables<"city">;

class CityAPI {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({ baseURL: "http://localhost:3000/" });
  }

  async getCities() {
    try {
      const path = "/api/city";
      const response = await this.axios.get<CountryType>(path);

      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching data : ", error);
    }
  }
  async getCitiesById(id: number, isMultiple: boolean) {
    try {
      const path = `/api/city/${id}`;
      const response = await this.axios.get<CountryType[] | CountryType>(path, {
        params: {
          id,
          isMultiple,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching data : ", error);
    }
  }

  async search(name: string) {
    try {
      const path = `/api/city/search`;
      const response = await this.axios.get<CountryType>(path, {
        params: {
          name,
        },
      });
      return response.data;
    } catch (error) {}
  }
}

export default CityAPI;
