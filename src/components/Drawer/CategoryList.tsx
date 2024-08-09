"use client";

import { api } from "@/apis/api";
import { ICON } from "@/constants/icon";
import { Country } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import Category from "./Category";
import MyTripPlanner from "./MyTripPlanner";
import TripList from "./TripList";

function CategoryList() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: countries } = useQuery<Country[], AxiosError>({
    queryKey: ["countries"],
    queryFn: async (): Promise<Country[]> => {
      const response = await api.country.getSortedCountries();
      return response || [];
    },
  });

  const handleCategoryClick = (label: string) => {
    setSelectedCategory((prevLabel) => (prevLabel === label ? "" : label));
  };

  return (
    <nav className="flex flex-col px-4">
      <Category
        href="/"
        imgPath={`/drawer/${ICON.drawer.home}.png`}
        alt="home"
        label="홈"
      />
      {/* 추후 추가 가능성 있는 컴포넌트 */}
      <Category
        href="/my/bookmarks"
        imgPath={`/drawer/drawer-bookmark.svg`}
        alt="bookmark"
        label="보관함"
      />
      <Category
        imgPath={`/drawer/${ICON.drawer.planner}.png`}
        alt="planner"
        label="내 여행 플래너"
        isSelected={selectedCategory === "내 여행 플래너"}
        onClick={() => handleCategoryClick("내 여행 플래너")}
        hasSubCategory
      >
        <MyTripPlanner />
      </Category>
      <Category
        imgPath={`/drawer/${ICON.drawer.tour}.png`}
        alt="tour"
        label="여행지"
        isSelected={selectedCategory === "여행지"}
        onClick={() => handleCategoryClick("여행지")}
        hasSubCategory
      >
        {countries && <TripList countries={countries} />}
      </Category>
    </nav>
  );
}

export default CategoryList;
