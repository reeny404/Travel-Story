"use client";

import SearchBar from "@/components/SearchBar/SearchBar";
import { useState } from "react";
import InitialSearchView from "./InitialSearchView";
import SearchResultView from "./SearchResultView";

function ClientSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    // 검색 로직
    // setSearchResults(검색 결과);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <section className="w-full p-3">
        {searchTerm ? <SearchResultView /> : <InitialSearchView />}
      </section>
    </>
  );
}

export default ClientSearch;
