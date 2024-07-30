"use client";

import { ICON } from "@/constants/Icon";
import Image from "next/image";
import { useRef } from "react";

// 추후 input width 조정 필요
function SearchBar() {
  const searchValue = useRef<HTMLInputElement>(null);

  const handleSearchValue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.current) {
      // 폼 제출 로직으로 수정 전 임시 log
      console.log(searchValue.current.value.trim());
      searchValue.current.value = "";
    }
  };

  return (
    <form
      className="flex fixed top-[253px] left-1/2 trasform -translate-x-1/2 w-[335px] h-10 p-[10px] bg-white rounded-lg shadow-md text-sm"
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
    </form>
  );
}

export default SearchBar;
