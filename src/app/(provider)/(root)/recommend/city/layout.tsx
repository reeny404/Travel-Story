"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/Icon";
import useRecommendStore from "@/stores/recommend.store";
import { City, RecommendResponse } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PropsWithChildren } from "react";

function CityLayout({ children }: PropsWithChildren) {
  const { cityId } = useRecommendStore((state) => state);

  const { data: city } = useQuery<RecommendResponse<City>, AxiosError, City>({
    queryKey: ["cityById", cityId],
    queryFn: () => api.city.getCityById(cityId),
    select: (data) => data?.data,
  });
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        leftIcons: [
          {
            icon: ICON.arrow.back.black,
            alt: "Back",
            size: 20,
            path: "/",
          },
        ],
        title: city?.krName!,
        titleAlign: "center",
        rightIcons: [
          {
            icon: ICON.search.black,
            alt: "Search",
            size: 20,
            onClick: () => {},
          },
          {
            icon: ICON.menu.burgerBlack,
            alt: "Menu",
            size: 20,
            onClick: () => {},
          },
        ],
      }}
    >
      {children}
    </MainLayout>
  );
}

export default CityLayout;
