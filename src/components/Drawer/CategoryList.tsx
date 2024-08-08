"use client";

import { ICON } from "@/constants/icon";
import { useState } from "react";
import Category from "./Category";
import MyTripPlanner from "./MyTripPlanner";
import TripList from "./TripList";

function CategoryList() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

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
      <Category
        href="/my"
        imgPath={`/drawer/${ICON.drawer.mypage}.png`}
        alt="mypage"
        label="마이 페이지"
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
        <TripList />
      </Category>
    </nav>
  );
}

export default CategoryList;
