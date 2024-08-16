"use client";

import { api } from "@/apis/api";
import CardType from "@/components/Card/CardType";
import SvgIcon from "@/components/commons/SvgIcon";
import SearchBar from "@/components/SearchBar/SearchBar";
import ArchCardSlider from "@/components/Slider/ArchCardSlider";
import useCountryFilterStore from "@/stores/searchFilter.store";
import { Area } from "@/types/Recommend";
import { SearchResponse, SearchResultsType } from "@/types/search";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InitialSearchView from "./InitialSearchView";
import SearchFilter from "./SearchFilter";
import SearchResultView from "./SearchResultView";

const INITIAL_ITEMS = 3;
const ITEMS_PER_PAGE = 5;

function ClientSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("term") || "";
  const [searchTerm, setSearchTerm] = useState<string>(initialQuery);
  const [searchResults, setSearchResults] = useState({
    place: [] as Area[],
    restaurant: [] as Area[],
    accommodation: [] as Area[],
    shop: [] as Area[],
  });
  const [currentPage, setCurrentPage] = useState<{ [key: string]: number }>({
    place: 1,
    restaurant: 1,
    accommodation: 1,
    shop: 1,
  });

  const [totalResults, setTotalResults] = useState({
    place: 0,
    restaurant: 0,
    accommodation: 0,
    shop: 0,
  });

  const { countryFilter } = useCountryFilterStore();
  const [isFilterOpen, setIsFiterOpen] = useState<boolean>(false);

  const {
    data: searchedData,
    isPending,
    error,
  } = useQuery<SearchResponse<SearchResultsType>, AxiosError>({
    queryKey: ["searchResults", searchTerm, countryFilter?.id],
    queryFn: () =>
      api.area.search(
        searchTerm,
        countryFilter?.id?.toString(),
        1,
        INITIAL_ITEMS,
        ""
      ),
    enabled: !!searchTerm,
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (searchedData && searchedData.data) {
      const responseData = searchedData.data;
      const totalData = searchedData.total;

      console.log("총 검색 결과:", totalData);

      setSearchResults({
        place: responseData.place || [],
        restaurant: responseData.restaurant || [],
        accommodation: responseData.accommodation || [],
        shop: responseData.shop || [],
      });

      setTotalResults({
        place: totalData.place,
        restaurant: totalData.restaurant,
        accommodation: totalData.accommodation,
        shop: totalData.shop,
      });
    }
  }, [searchedData]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage({
      place: 1,
      restaurant: 1,
      accommodation: 1,
      shop: 1,
    });

    const params = new URLSearchParams();
    params.append("term", term);

    if (countryFilter && countryFilter.id != null) {
      params.append("country", countryFilter.id.toString());
    } else {
      params.delete("country");
    }

    router.push(`/search?${params.toString()}`);
  };

  const handleLoadMore = (category: keyof SearchResultsType) => {
    const nextPage = currentPage[category] + 1;

    setCurrentPage((prevPages) => ({
      ...prevPages,
      [category]: nextPage,
    }));

    api.area
      .search(
        searchTerm,
        countryFilter?.id?.toString(),
        nextPage,
        ITEMS_PER_PAGE,
        category
      )
      .then((response) => {
        const categoryData = response.data[category];

        setSearchResults((prevResults) => {
          const updatedResults = [
            ...prevResults[category],
            ...categoryData.filter(
              (newResult) =>
                !prevResults[category].some(
                  (currentResult) => currentResult.id === newResult.id
                )
            ),
          ];

          return {
            ...prevResults,
            [category]: updatedResults,
          };
        });
      })
      .catch((error) => {
        console.error("데이터 로드 중 오류 발생:", error);
      });
  };

  const handleFold = (category: keyof typeof searchResults) => {
    setSearchResults((prevResults) => ({
      ...prevResults,
      [category]: prevResults[category].slice(0, INITIAL_ITEMS),
    }));

    setCurrentPage((prevPages) => ({
      ...prevPages,
      [category]: 1,
    }));
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
          onSearch={handleSearch}
          onLoadMore={handleLoadMore}
          onFold={handleFold}
          totalResults={totalResults}
        />
      ) : (
        <InitialSearchView onSearch={handleSearch} />
      )}
      <div className="w-full my-8">
        <CardType title="추천 여행지" />
        <ArchCardSlider spacing={12} slidesPerView={3.8} />
      </div>
    </>
  );
}

export default ClientSearch;
