import axios, { AxiosInstance } from "axios";
import { AccountAPI } from "./account.api";
import AreaAPI from "./area.api";
import AuthAPI from "./auth.api";
import BookmarkAPI from "./bookmark.api";
import CityAPI from "./city.api";
import CountryAPI from "./country.api";
import PlanAPI from "./plan.api";
import ReviewAPI from "./review";

class API {
  private axios: AxiosInstance;

  country;
  city;
  area;
  auth;
  account;
  plan;
  review;
  bookmark;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });
    this.country = new CountryAPI(this.axios);
    this.city = new CityAPI(this.axios);
    this.area = new AreaAPI(this.axios);
    this.auth = new AuthAPI(this.axios);
    this.account = new AccountAPI(this.axios);
    this.plan = new PlanAPI(this.axios);
    this.review = new ReviewAPI(this.axios);
    this.bookmark = new BookmarkAPI(this.axios);
  }
}

export const api = new API();
