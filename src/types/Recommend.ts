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

export type extendArea = Tables<"area"> & {
  city: {
    krName: string;
    countryId: number;
  };
  country: {
    krName: string;
  };
  tags?: string[];
  krName?: string;
};

export type AreaBookmark = Tables<"areaBookmark">;
export type BookmarkWithArea = AreaBookmark & { area: Area };

export type BookmarkAPIType = {
  areaId: number;
};

type AreaTypes = "restaurant" | "place" | "shop" | "accommodation";
type AreaType = { type: AreaTypes };

export type AreaReview = Tables<"areaReview"> & {
  imageUrls: string[];
  area: AreaType;
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

export type CardResponseType = {
  [key: string]: extendArea[];
};

export type ImgFileType = string | { name: string; file: File };
