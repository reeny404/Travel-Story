"use client";

import { api } from "@/apis/api";
import useRecommendStore from "@/stores/recommend.store";
import { filterByAreaType } from "@/utils/filterByAreaType";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import AreaCard from "../../_components/AreaCard";

function AreaDetailPage() {
  const pathname = usePathname();
  const areaType = pathname.split("/").slice(-1)[0];
  const { cityId } = useRecommendStore();

  const { data: areas } = useQuery({
    queryKey: ["area", cityId],
    queryFn: () => api.area.getCitiesByCity(cityId),
    select: (data) => data?.data,
  });

  const filteredArea = filterByAreaType(areas!, areaType);

  return (
    <div className="container overflow-x-hidden w-screen h-screen max-w-[375px] mx-auto flex-col">
      {filteredArea?.map((area, idx) => {
        return (
          <AreaCard
            key={idx}
            title={area.title}
            description={area.description}
            rating={4}
            imageUrl={area.imageUrl!}
            linkUrl="/"
          />
        );
      })}
    </div>
  );
}

export default AreaDetailPage;
