"use client";

import { api } from "@/apis/api";
import SvgIcon from "@/components/commons/SvgIcon";
import SearchBar from "@/components/SearchBar/SearchBar";
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
  const initialQuery = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState<string>(initialQuery);
  const [searchResults, setSearchResults] = useState<Area[]>([]);
  const [isFilterOpen, setIsFiterOpen] = useState<boolean>(false);

  const [tempSearchTerm, setTempSearchTerm] = useState<string>("");

  const {
    data: searchedData,
    isPending,
    error,
  } = useQuery<RecommendResponse<Area[]>, AxiosError>({
    queryKey: ["searchResults", searchTerm],
    queryFn: () => api.area.search(searchTerm),
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
    if (term) {
      router.push(`?query=${term}`);
    }
  };

  const handleToggleFilter = () => {
    setIsFiterOpen((prev) => !prev);
  };

  const handleTempSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-2 px-4 pt-2 pb-3">
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
        <div
          className="p-[10px] bg-white rounded-lg shadow-filter-icon hover:opacity-85 active:transform active:scale-95 cursor-pointer active:bg-gray-150"
          onClick={handleToggleFilter}
        >
          <SvgIcon name="slider" width={18} height={18} title="filter" />
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 px-4 pt-2 pb-3">
        <input
          type="text"
          className="w-[90%] bg-white p-2 border rounded-lg"
          placeholder="임시 검색어를 입력하세요"
          value={tempSearchTerm}
          onChange={handleTempSearchChange}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-lg"
          onClick={() => console.log("임시 검색어:", tempSearchTerm)}
        >
          임시 검색
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
