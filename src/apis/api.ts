import axios, { AxiosInstance } from "axios";
import { AccountAPI } from "./account.api";
import AreaAPI from "./area.api";
import CityAPI from "./city.api";
import CountryAPI from "./country.api";

class API {
  private axios: AxiosInstance;

  country;
  city;
  area;
  account;

  constructor() {
    // TODO base URL BASE_URL 상수로 교체 필요 -> .env.local 에 값 추가 요청 해야함 
    this.axios = axios.create({ baseURL: "http://localhost:3000/" });
    this.country = new CountryAPI(this.axios);
    this.city = new CityAPI(this.axios);
    this.area = new AreaAPI(this.axios);
    this.account = new AccountAPI(this.axios);
  }
}

export const api = new API();
