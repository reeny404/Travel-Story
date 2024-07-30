"use client";

import { ICON } from "@/constants/Icon";
import Image from "next/image";
import { useRef } from "react";

type SearchBarProps = {
  onSearch?: (term: string) => void;
};

// 추후 input width 조정 필요
function SearchBar({ onSearch }: SearchBarProps) {
  const searchValue = useRef<HTMLInputElement>(null);

  const handleSearchValue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.current && onSearch) {
      onSearch(searchValue.current.value.trim());
    }
  };

  return (
    <form
      className="flex justify-between w-[335px] h-10 p-[10px] bg-white rounded-lg shadow-md text-sm"
      onSubmit={handleSearchValue}
    >
      <Image
        src={`/icons/${ICON.search.black}.png`}
        alt="search"
        width={20}
        height={20}
        className="mr-2 cursor-pointer"
      />
      <input
        className="w-[250px] bg-transparent outline-none"
        placeholder={`'판테온'으로 떠나보실래요?`}
        ref={searchValue}
      />
      <Image
        src={`/icons/${ICON.microphone.black}.png`}
        alt="microphone"
        width={18}
        height={18}
        className="mr-2 cursor-pointer"
      />
    </form>
  );
}

export default SearchBar;
