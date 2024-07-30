"use client";

import { api } from "@/apis/api";
import useRecommendStore from "@/stores/recommend.store";
import { Area, RecommendResponse } from "@/types/Recommend";
import { filterByAreaType } from "@/utils/filterByAreaType";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname } from "next/navigation";
import AreaCard from "../../../_components/Cards/AreaCard";

function AreaTypePage() {
  const pathname = usePathname();
  const areaType = pathname.split("/").slice(-1)[0];
  const { cityId } = useRecommendStore();

  const { data: areas } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["areasByCity", cityId],
    queryFn: () => api.area.getAreasByCity(cityId),
    select: (data) => data?.data,
  });

  const filteredArea = filterByAreaType(areas!, areaType);

  return (
    <div className="container overflow-x-hidden h-full max-w-[375px] flex-col">
      {filteredArea?.map((area, idx) => {
        return (
          <AreaCard
            key={idx}
            title={area.title}
            description={area.description}
            rating={4}
            imageUrl={area.imageUrl!}
            linkUrl={`/recommend/area/${area.id}`}
          />
        );
      })}
    </div>
  );
}

export default AreaTypePage;
