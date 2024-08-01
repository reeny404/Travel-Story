"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import { Area, Country, RecommendResponse } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import AreaCard from "../../../_components/Cards/AreaCard";
type AreaTypePageProps = {
  params: { id: string; areaType: string };
};

function AreaTypePage({ params }: AreaTypePageProps) {
  const areaType = params.areaType;
  const countryId = parseInt(params.id);
  const { data: country } = useQuery<RecommendResponse<Country>>({
    queryKey: ["countryDetail", countryId],
    queryFn: () => api.country.getCountry(countryId),
  });
  const { data: areas } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["placeAreas", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, areaType),
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
        title: country?.data.krName!,
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
      <div className="container overflow-x-hidden h-full max-w-[375px] flex-col">
        {areas?.map((area, idx) => {
          return (
            <AreaCard
              key={idx}
              title={area.title}
              description={area.description}
              rating={4}
              imageUrl={area.imageUrl}
              linkUrl={`/recommend/area/${area.id}`}
              id={area.id}
            />
          );
        })}
      </div>
    </MainLayout>
  );
}

export default AreaTypePage;
