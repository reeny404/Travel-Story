"use client";

import useCountryFilterStore from "@/stores/searchFilter.store";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import SvgIcon from "../commons/SvgIcon";

type SearchBarProps = {
  onSearch?: (term: string) => void;
  initialValue?: string;
  isDisabled?: boolean;
};

function SearchBar({
  onSearch,
  initialValue = "",
  isDisabled,
}: SearchBarProps) {
  const { countryFilter, resetCountryFilter } = useCountryFilterStore();
  const [searchTerm, setSearchTerm] = useState<string>(initialValue);

  useEffect(() => {
    SvgIcon.preload("x");
  }, []);

  const handleChangeTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debounceSearch(e.target.value);
  };

  const debounceSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (value.trim() && onSearch) {
          onSearch(value.trim());
        }
      }, 300),
    [onSearch]
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debounceSearch.flush();
  };

  const handleEmpty = () => {
    setSearchTerm("");
    if (onSearch && window.location.pathname.includes("search")) {
      onSearch("");
    }
  };

  return (
    <form
      className="relative flex justify-between w-11/12 h-10 p-3 bg-white text-sm rounded-lg shadow-search"
      onSubmit={handleSearch}
    >
      <div className="flex items-center w-full gap-2">
        <SvgIcon
          name="search"
          width={20}
          height={20}
          title="search"
          className="flex-shrink-0"
        />

        {countryFilter.name && (
          <div className="flex items-center space-x-1 ml-1">
            <span
              className="max-w-[7ch] text-brand-800 whitespace-nowrap cursor-pointer overflow-hidden text-ellipsis"
              onClick={resetCountryFilter}
            >
              {countryFilter.name}
            </span>
          </div>
        )}

        <input
          className="w-[90%] bg-transparent outline-none"
          placeholder={`'파리'로 떠나보실래요?`}
          value={searchTerm}
          onChange={handleChangeTerm}
          disabled={isDisabled}
        />

        {searchTerm && (
          <SvgIcon
            name="x"
            width={12}
            height={12}
            title="cancel"
            className="cursor-pointer transition-transform duration-300 ease-in-out"
            onClick={handleEmpty}
          />
        )}
      </div>
    </form>
  );
}

export default SearchBar;
