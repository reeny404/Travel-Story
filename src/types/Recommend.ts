import { AxiosError } from "axios";
import { Tables } from "./supabase";

export type Country = Tables<"country">;

export type IntroCities = {
  name: string;
  id: number;
};

export type City = Tables<"city">;

export type Area = Tables<"area">;

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
