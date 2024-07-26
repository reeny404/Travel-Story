import axios, { AxiosInstance } from "axios";
import AreaAPI from "./area.api";
import AuthAPI from "./auth.api";
import CityAPI from "./city.api";
import CountryAPI from "./country.api";

class API {
  private axios: AxiosInstance;

  country;
  city;
  area;
  auth;

  constructor() {
    this.axios = axios.create({ baseURL: "http://localhost:3000/" });
    this.country = new CountryAPI(this.axios);
    this.city = new CityAPI(this.axios);
    this.area = new AreaAPI(this.axios);
    this.auth = new AuthAPI(this.axios);
  }
}

export const api = new API();
