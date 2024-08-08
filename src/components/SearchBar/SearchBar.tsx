"use client";

import { ICON } from "@/constants/icon";
import Image from "next/image";
import { useState } from "react";
import SvgIcon from "../commons/SvgIcon";

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
  };

  const handleEmpty = () => {
    setSearchValue("");
    if (onSearch && window.location.pathname.includes("search")) {
      onSearch("");
    }
  };

  return (
    <form
      className="flex justify-between w-11/12 h-10 p-[10px] bg-white rounded-lg shadow-md text-sm"
      onSubmit={handleSearch}
    >
      <div className="flex">
        <SvgIcon
          name="search"
          width={20}
          height={20}
          title="search"
          className="mr-2"
        />

        <input
          className="w-[250px] bg-transparent outline-none"
          placeholder={`'파리'로 떠나보실래요?`}
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
