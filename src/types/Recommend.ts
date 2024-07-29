import { AxiosError } from "axios";
import { Tables } from "./supabase";

export type Country = Tables<"country">;

export type IntroQueryFn = {
  city: RecommendResponse<City[]>;
  country: RecommendResponse<Country>;
};
export type IntroQueryReturn = {
  cities: { name: string; id: number }[];
  country: Country;
};

export type City = Tables<"city">;

export type Area = Tables<"area"> & {
  info: {
    location: string;
    name: string;
    notes: string;
    opening_hours?: { close: string; open: string };
    ticket_price?: { adult?: string; child?: string; youth?: "string" };
  };
};

export type AreaReview = Tables<"areaReview">;

export type Rating = {
  rating: number;
  pieces: number;
};

export type RecommendResponse<T> = {
  status: number;
  message: string;
  data: T;
  error: null | AxiosError;
};
