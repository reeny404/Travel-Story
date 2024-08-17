"use client";

import { useAuth } from "@/contexts/auth.contexts";
import { useRecentStore } from "@/stores/recent.store";
import useCountryFilterStore from "@/stores/searchFilter.store";
import { createClient } from "@/supabase/client";
import formatDate from "@/utils/searchDate";
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
  const [placeholder, setPlaceholder] =
    useState<string>("'파리'로 떠나보실래요?");
  const supabase = createClient();
  const { isInitialized, user } = useAuth();
  const { recentSearch, setRecentSearch } = useRecentStore();
  const [prevSearch, setPrevSearch] = useState(recentSearch);

  useEffect(() => {
    SvgIcon.preload("x");
  }, []);

  useEffect(() => {
    setPrevSearch(recentSearch);
  }, [recentSearch]);

  // 추천 검색어 input창에 반영하기 위해 추가
  useEffect(() => {
    setSearchTerm(initialValue || "");
  }, [initialValue]);

  const handleBlurSearch = async () => {
    if (searchTerm !== "" && isInitialized && user) {
      if (prevSearch && prevSearch.length === 3) {
        prevSearch.shift();
      }
      const newArray = prevSearch
        ? [...prevSearch, { search: searchTerm, date: formatDate() }]
        : [{ search: searchTerm, date: formatDate() }];
      setRecentSearch(newArray);
      await supabase.from("recents").upsert(
        [
          {
            user_id: user.id,
            search: newArray,
          },
        ],
        {
          onConflict: "id",
        }
      );
    }
    setPlaceholder("‘'파리'로 떠나보실래요?");
  };

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
      }, 400),
    [onSearch]
  );

  // 디바운스 처리 중 input값이 변하면 깨지는 현상 방지
  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debounceSearch.flush();
  };

  const handleEmptySearchBar = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  const handleRemoveFilter = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => {
    const pressFilteredCountry = setTimeout(() => {
      resetCountryFilter();
    }, 800);

    const clearPress = () => {
      clearTimeout(pressFilteredCountry);
    };

    // window 객체에 touchstart 이벤트가 있으면 모바일 환경
    if ("touchstart" in window) {
      e.currentTarget.addEventListener("touchend", clearPress, { once: true });
      e.currentTarget.addEventListener("touchcancel", clearPress, {
        once: true,
      });
    } else {
      e.currentTarget.addEventListener("mouseup", clearPress, { once: true });
      e.currentTarget.addEventListener("mouseleave", clearPress, {
        once: true,
      });
    }
  };

  return (
    <form
      className="relative flex justify-between w-11/12 h-10 p-3 bg-white text-sm rounded-lg shadow-search sm:max-w-[600px] sm:w-full sm:h-12 sm:p-4"
      onSubmit={handleSearch}
    >
      <div className="flex items-center w-full gap-2 sm:gap-3 ">
        <SvgIcon
          name="search"
          width={20}
          height={20}
          title="search"
          className="flex-shrink-0"
        />

        {countryFilter.name && (
          <div className="flex items-center space-x-1 ml-1 sm:ml-2">
            <h5
              className="max-w-[7ch] text-brand-800 whitespace-nowrap cursor-pointer overflow-hidden text-ellipsis active:scale-95"
              onMouseDown={handleRemoveFilter}
            >
              {countryFilter.name}
            </h5>
          </div>
        )}

        <input
          type="text"
          className="w-[90%] bg-transparent outline-none placeholder-neutral-750 focus:placeholder-neutral-400"
          value={searchTerm}
          onChange={handleChangeTerm}
          placeholder={placeholder}
          onFocus={() => setPlaceholder("나라, 도시, 장소, 숙소")}
          onBlur={handleBlurSearch}
          disabled={isDisabled}
        />

        {searchTerm && (
          <SvgIcon
            name="x"
            width={12}
            height={12}
            title="cancel"
            className="ml-1 cursor-pointer transition-transform duration-300 ease-in-out sm:ml-2"
            onClick={handleEmptySearchBar}
          />
        )}
      </div>
    </form>
  );
}

export default SearchBar;
