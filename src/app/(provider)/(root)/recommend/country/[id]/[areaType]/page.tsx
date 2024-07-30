"use client";

import { api } from "@/apis/api";
import { Area, RecommendResponse } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import AreaCard from "../../../_components/Cards/AreaCard";
type AreaTypePageProps = {
  params: { id: string; areaType: string };
};

function AreaTypePage({ params }: AreaTypePageProps) {
  const areaType = params.areaType;
  const countryId = parseInt(params.id);

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
          />
        );
      })}
    </div>
  );
}

export default AreaTypePage;
