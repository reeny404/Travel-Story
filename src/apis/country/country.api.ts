import { Tables } from "@/types/supabase";
import axios, { AxiosInstance } from "axios";

type CountryType = Tables<"country">;

class CountryAPI {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({ baseURL: "http://localhost:3000/" });
  }

  async getCountries() {
    const path = "/api/country";
    const response = await this.axios.get<CountryType>(path);

    const data = response.data;
    return data;
  }
}

export default CountryAPI;
