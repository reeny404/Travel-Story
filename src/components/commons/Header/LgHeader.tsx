"use client";

import { api } from "@/apis/api";
import SearchFilter from "@/app/(provider)/(root)/search/_components/SearchFilter";
import SearchBar from "@/components/SearchBar/SearchBar";
import { dmSerifDisplayFont } from "@/constants/fonts";
import { useAuth } from "@/contexts/auth.contexts";
import useDrawerStore from "@/stores/drawer.store";
import useCountryFilterStore from "@/stores/searchFilter.store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import SvgIcon from "../SvgIcon";

function LgHeader({ onSearch }: { onSearch?: (term: string) => void }) {
  const { isInitialized, isLoggedIn, setUser } = useAuth();
  const { isOpen, closeDrawer } = useDrawerStore();
  const [isFilterOpen, setIsFiterOpen] = useState<boolean>(false);

  const router = useRouter();
  const path = usePathname();
  const isPlanBold = path.includes("plan");
  const isAreaBold = path.includes("recommend") || path === "/";

  const handleIsLoginUser = (value: string) => {
    if (isInitialized && isLoggedIn) {
      return router.push(`/${value}`);
    } else {
      return router.push("/login");
    }
  };

  const handleLogout = async () => {
    setUser(null);
    await api.auth.logout();
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleHomeClick = () => {
    if (!isAreaBold) {
      router.push("/");
    }
  };

  const handleToggleFilter = () => {
    setIsFiterOpen((prev) => !prev);
  };

  const [searchTerm, setSearchTerm] = useState<string>("");
  const { countryFilter, resetCountryFilter } = useCountryFilterStore();

  // 검색어가 변경될 때 호출되는 함수
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    }
    const params = new URLSearchParams();
    params.append("term", term);

    if (countryFilter && countryFilter.id != null) {
      params.append("country", countryFilter.id.toString());
    }

    // URL을 갱신하여 검색 페이지로 이동
    router.push(`/search?${params.toString()}`);
  };

  return (
    <header className="w-full items-center px-8 hidden md:block">
      <div className="flex flex-row items-center h-8 text-xs space-x-6">
        <div className="flex-grow" />
        <button onClick={() => handleIsLoginUser("my")}>마이페이지</button>
        <button onClick={() => handleIsLoginUser("my/bookmarks")}>
          보관함
        </button>
        {isInitialized && isLoggedIn ? (
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <button onClick={handleLogin}>로그인</button>
        )}
      </div>
      <div className="flex flex-row w-full pt-3 pb-6 items-center lg:justify-between md:justify-center md:space-x-8">
        <Link href={"/"}>
          <h2
            className={`${dmSerifDisplayFont.className} text-[28px] leading-[38px] whitespace-nowrap`}
          >
            Travel Story
          </h2>
        </Link>
        <div className="flex flex-row w-[600px] space-x-2">
          <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
          <button
            className="flex justify-center items-center w-12 h-12 p-[10px] bg-white rounded-lg shadow-filter-icon hover:opacity-85 active:transform active:scale-95 cursor-pointer active:bg-gray-150"
            type="button"
            onClick={handleToggleFilter}
          >
            <SvgIcon name="slider" width={18} height={18} title="filter" />
          </button>
          {isFilterOpen && <SearchFilter onClose={handleToggleFilter} />}
        </div>
        <div className="flex-row items-center text-xl py-3 w-fit font-light block md:hidden lg:flex">
          <button
            onClick={handleHomeClick}
            className={`${isAreaBold ? "font-medium" : ""}`}
          >
            여행지
          </button>
          <div className="mx-4 w-[1px] h-4 bg-neutral-300" />
          <button
            onClick={() => handleIsLoginUser("plan/")}
            className={`${isPlanBold ? "font-medium" : ""}`}
          >
            내 여행 플래너
          </button>
        </div>
      </div>
    </header>
  );
}

export default LgHeader;
