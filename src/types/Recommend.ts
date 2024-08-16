import { AxiosError } from "axios";
import { Tables } from "./supabase";

export type Country = Tables<"country">;

export type IntroCountryType = {
  cities: City[];
  country: Country;
};
export type City = Tables<"city">;

export type AreaBookmark = Tables<"areaBookmark">;
export type extendBookmark = AreaBookmark & { area: Area };
export type GroupedArea = {
  place: Area[];
  accommodation: Area[];
  restaurant: Area[];
  shop: Area[];
};

export type BookmarkAPIType = {
  areaId: number;
};
export type AreaReview = Tables<"areaReview"> & {
  imageUrls: string[];
};
export type Area = Tables<"area"> & {
  tags: string[];
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
