"use client";

import { api } from "@/apis/api";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Area, RecommendResponse } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InitialSearchView from "./InitialSearchView";
import SearchResultView from "./SearchResultView";

function ClientSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState<string>(initialQuery);
  const [searchResults, setSearchResults] = useState<Area[]>([]);

  const {
    data: searchedData,
    isPending,
    error,
  } = useQuery<RecommendResponse<Area[]>, AxiosError>({
    queryKey: ["searchResults", searchTerm],
    queryFn: () => api.area.search(searchTerm),
    enabled: !!searchTerm,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
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

  return (
    <>
      <div className="flex justify-center items-center px-5 pt-5">
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
      </div>
      <section className="w-full mt-4">
        {searchTerm ? (
          <SearchResultView
            results={searchResults}
            isPending={isPending}
            error={error}
          />
        ) : (
          <InitialSearchView />
        )}
      </section>
    </>
  );
}

export default ClientSearch;
