import { AxiosError } from "axios";
import { Area } from "./Recommend";

export type SearchResultsType = {
  place: Area[];
  restaurant: Area[];
  accommodation: Area[];
  shop: Area[];
};

export type FoldStateType = {
  place: boolean;
  restaurant: boolean;
  accommodation: boolean;
  shop: boolean;
};

export type TotalResultsType = {
  place: number;
  restaurant: number;
  accommodation: number;
  shop: number;
};

export type SearchResultViewProps = {
  results: SearchResultsType;
  isPending: boolean;
  error: Error | null;
  onSearch: (term: string) => void;
  onLoadMore: (category: keyof SearchResultsType) => void;
  onFold: (category: keyof SearchResultsType) => void;
  isFolded: FoldStateType;
  totalResults: TotalResultsType;
};

export type SearchResponse<T> = {
  status: number;
  message: string;
  data: T;
  error: null | AxiosError;
  total: TotalResultsType;
};
