"use client";

import { debounce } from "lodash";
import { useMemo, useState } from "react";
import SvgIcon from "../commons/SvgIcon";

type SearchBarProps = {
  onSearch?: (term: string) => void;
  initialValue?: string;
};

function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState(initialValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
    setSearchValue("");
    if (onSearch && window.location.pathname.includes("search")) {
      onSearch("");
    }
  };

  return (
    <form
      className="relative flex justify-between w-11/12 h-10 p-3 bg-white text-sm rounded-lg shadow-search"
      onSubmit={handleSearch}
    >
      <div className="flex items-center w-full gap-3">
        <SvgIcon name="search" width={20} height={20} title="search" />

        <input
          className="w-[90%] bg-transparent outline-none"
          placeholder={`'파리'로 떠나보실래요?`}
          value={searchValue}
          onChange={handleInputChange}
        />
        {searchValue && (
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
