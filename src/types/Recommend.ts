import { Tables } from "./supabase";

export type Country = Tables<"country">;

export type IntroCities = {
  name: string;
  id: number;
};

export type City = Tables<"city">;

export type Area = Tables<"area">;

export type AreaReview = Tables<"areaReview">;
