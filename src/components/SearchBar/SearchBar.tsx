"use client";

import { ICON } from "@/constants/icon";
import Image from "next/image";
import { useState } from "react";

type SearchBarProps = {
  onSearch?: (term: string) => void;
  initialValue?: string;
};

function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState(initialValue);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = searchValue.trim();
    if (trimmedValue && onSearch) {
      onSearch(trimmedValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    // if (value.trim() === "" && onSearch) {
    //   onSearch("");
    // }
  };

  const handleEmpty = () => {
    setSearchValue("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form
      className="flex justify-between w-11/12 h-10 p-[10px] bg-white rounded-lg shadow-md text-sm"
      onSubmit={handleSearch}
    >
      <div className="flex">
        <Image
          src={`/icons/${ICON.search.black}.png`}
          alt="search"
          width={20}
          height={20}
          className="mr-2 cursor-pointer"
          priority
        />
        <input
          className="w-[250px] bg-transparent outline-none"
          placeholder={`'판테온'으로 떠나보실래요?`}
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>
      {searchValue && (
        <Image
          src={`/icons/${ICON.cancel.gray}.png`}
          alt="microphone"
          width={18}
          height={18}
          className="mr-2 cursor-pointer transition-transform duration-300 ease-in-out"
          onClick={handleEmpty}
        />
      )}
    </form>
  );
}

export default SearchBar;
