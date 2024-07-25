import { Tables } from "@/types/supabase";
import axios, { AxiosInstance } from "axios";

type CountryType = Tables<"country">;

class CountryAPI {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({ baseURL: "http://localhost:3000/" });
  }

  async getCountries() {
    try {
      const path = "/api/country";
      const response = await this.axios.get<CountryType>(path);

      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching data : ", error);
    }
  }

  async getCountry(id: number) {
    try {
      const path = `/api/country/${id}`;
      const response = await this.axios.get<CountryType>(path, {
        params: {
          id,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching data : ", error);
    }
  }
}

export default CountryAPI;
