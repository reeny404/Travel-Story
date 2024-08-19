"use client";

import { api } from "@/apis/api";
import SearchBar from "@/components/SearchBar/SearchBar";
import { dmSerifDisplayFont } from "@/constants/fonts";
import { useAuth } from "@/contexts/auth.contexts";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SvgIcon from "../SvgIcon";

function LgHeader() {
  const { isInitialized, isLoggedIn, setUser } = useAuth();
  const [isPlanBold, setIsPlanBold] = useState(false);
  const [isAreaBold, setIsAreaBold] = useState(false);

  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const recommend = path.includes("recommend") || path === "/";
    const myPlan = path.includes("plan");

    setIsAreaBold(recommend);
    setIsPlanBold(myPlan);
  }, [path]);

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

  return (
    <header className="w-full items-center px-8 hidden sm:block">
      <div className="flex flex-row items-center h-8 text-[12px] space-x-6">
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
      <div className="flex flex-row w-full pt-3 pb-6 items-center justify-between">
        <Link href={"/"}>
          <h1
            className={`${dmSerifDisplayFont.className} text-[28px] leading-[38px] whitespace-nowrap`}
          >
            Travel Story
          </h1>
        </Link>
        <div className="flex flex-row w-[600px] space-x-2">
          <SearchBar />
          <button
            className="p-[10px] bg-white rounded-lg shadow-filter-icon hover:opacity-85 active:transform active:scale-95 cursor-pointer active:bg-gray-150"
            type="button"
          >
            <SvgIcon name="slider" width={18} height={18} title="filter" />
          </button>
        </div>
        <div className="flex flex-row items-center text-xl py-3 w-fit font-light">
          <button
            onClick={handleHomeClick}
            className={`${isAreaBold ? "font-medium" : ""}`}
          >
            여행지
          </button>
          <div className="mx-4 w-[1px] h-4 bg-neutral-300" />
          <button
            onClick={() => handleIsLoginUser("plan/recent")}
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
