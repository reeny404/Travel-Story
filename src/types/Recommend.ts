import { AxiosError } from "axios";
import { Tables } from "./supabase";

export type Country = Tables<"country">;

export type IntroDataTypeRes = {
  city: RecommendResponse<City[]>;
  country: RecommendResponse<Country>;
};
export type IntroDataType = {
  cities: { name: string; id: number }[];
  country: Country;
};

export type City = Tables<"city">;

export type Area = Tables<"area"> & {
  info: {
    location: string[];
    name: string;
    notes: string;
    opening_hours?: { close: string; open: string };
    ticket_price?: {
      adult?: string;
      child?: string;
      youth?: "string";
      average_meal_cost?: string;
    };
    phoneNumber: string;
    address: string;
  };
};

export type AreaBookmark = Tables<"areaBookmark">;
export type AreaBookmarkWithArea = AreaBookmark & { area: Area };

export type BookmarkType = {
  userId: string;
  areaId: number;
};

export type AreaReview = Tables<"areaReview"> & {
  imageUrls: string[];
};

export type Rating = {
  rating: number;
  pieces: number;
};

export type ReviewDataInsertType = {
  areaId: number;
  userId: string;
  areaName: string;
  images: { name: string; file: File };
  rating: number;
  textValue: string;
};
export type RecommendResponse<T> = {
  status: number;
  message: string;
  data: T;
  error: null | AxiosError;
};
