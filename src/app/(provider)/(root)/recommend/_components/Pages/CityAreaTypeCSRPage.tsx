"use client";

import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import { useBookmarks } from "@/hooks/useBookmark";
import { Area } from "@/types/Recommend";
import { getKrCategory } from "@/utils/getKrCategory";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { lazy } from "react";
const AreaCard = lazy(() => import("../Cards/AreaCard"));

type CityAreaTypeCSRPageProps = {
  cityId: number;
  areaType: string;
};

function CityAreaTypeCSRPage({ cityId, areaType }: CityAreaTypeCSRPageProps) {
  const { isBookmarked, addBookmark, deleteBookmark } = useBookmarks();
  const router = useRouter();

  const handleSearch = () => {
    return router.push(`/search`);
  };

  const { data: areas } = useQuery<Area[]>({
    queryKey: ["totalAreas", cityId],
  });

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: getKrCategory(areaType),
        titleAlign: "center",
        rightIcons: [
          {
            icon: ICON.search.black,
            alt: "Search",
            size: 20,
            onClick: handleSearch,
          },
        ],
      }}
    >
      <div className="container overflow-x-hidden h-full w-full flex-col gap-y-6 p-4">
        {areas?.map((area, idx) => {
          return (
            <AreaCard
              key={area.id}
              city={area.info.location[1]}
              country={area.info.location[0]}
              areaName={area.krName!}
              title={area.title}
              description={area.description}
              rating={4}
              imageUrl={area.imageUrl!}
              linkUrl={`/recommend/area/${area.id}`}
              id={area.id}
              addBookmark={() => addBookmark.mutate(area.id)}
              deleteBookmark={() => deleteBookmark.mutate(area.id)}
              isBookmarked={isBookmarked(area.id)}
              tags={area.tags}
            />
          );
        })}
      </div>
    </MainLayout>
  );
}

export default CityAreaTypeCSRPage;
