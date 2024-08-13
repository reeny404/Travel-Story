"use client";

import { api } from "@/apis/api";
import SvgIcon from "@/components/commons/SvgIcon";
import SearchBar from "@/components/SearchBar/SearchBar";
import useCountryFilterStore from "@/stores/searchFilter.store";
import { Area, RecommendResponse } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InitialSearchView from "./InitialSearchView";
import SearchFilter from "./SearchFilter";
import SearchResultView from "./SearchResultView";

function ClientSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("term") || "";
  const { countryFilter } = useCountryFilterStore();
  const [searchTerm, setSearchTerm] = useState<string>(initialQuery);
  const [searchResults, setSearchResults] = useState<Area[]>([]);
  const [isFilterOpen, setIsFiterOpen] = useState<boolean>(false);

  const {
    data: searchedData,
    isPending,
    error,
  } = useQuery<RecommendResponse<Area[]>, AxiosError>({
    queryKey: ["searchResults", searchTerm, countryFilter?.id],
    queryFn: () => api.area.search(searchTerm, countryFilter?.id?.toString()),
    enabled: !!searchTerm,
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (searchedData) {
      const data = Array.isArray(searchedData.data)
        ? searchedData.data
        : [searchedData.data];
      setSearchResults(data);
    }
  }, [searchedData]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    const params = new URLSearchParams();
    params.append("term", term);
    if (countryFilter && countryFilter.id != null) {
      params.append("country", countryFilter.id.toString());
    } else {
      params.delete("country");
    }

    router.push(`/search?${params.toString()}`);
  };

  const handleToggleFilter = () => {
    setIsFiterOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-2 px-4 pt-2 pb-3">
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
        <button
          className="p-[10px] bg-white rounded-lg shadow-filter-icon hover:opacity-85 active:transform active:scale-95 cursor-pointer active:bg-gray-150"
          onClick={handleToggleFilter}
          type="button"
        >
          <SvgIcon name="slider" width={18} height={18} title="filter" />
        </button>
      </div>

      {isFilterOpen && <SearchFilter onClose={handleToggleFilter} />}

      {searchTerm ? (
        <SearchResultView
          results={searchResults}
          isPending={isPending}
          error={error}
        />
      ) : (
        <InitialSearchView />
      )}
    </>
  );
}

export default ClientSearch;
