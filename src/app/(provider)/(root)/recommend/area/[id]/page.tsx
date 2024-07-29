"use client";

import { api } from "@/apis/api";
import { useTab } from "@/hooks/useTab";
import { Area, Rating, RecommendResponse } from "@/types/Recommend";
import { calcRatings } from "@/utils/calcRatings";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname } from "next/navigation";
import AreaDetailCard from "../../_components/AreaPage/AreaDetailCard";
import AreaReviewCard from "../../_components/AreaPage/AreaReviewCard";
import ReviewSummaryCard from "../../_components/AreaPage/ReviewSummary";
import UnderBar from "../../_components/AreaPage/UnderBar";

const BOOKMARK_DATA = {
  userId: "66ec615f-1dd3-45df-83b6-2e178b5abbc3",
  areaId: 1,
};

function AreaDetailPage() {
  const pathname = usePathname();
  const areaId = parseInt(pathname.split("/").slice(-1)[0]);

  const { currentTab } = useTab();

  const { data: area, isLoading } = useQuery<
    RecommendResponse<Area>,
    AxiosError,
    Area
  >({
    queryKey: ["areasById", areaId],
    queryFn: () => api.area.getAreasById(areaId),
    select: (data) => data?.data,
  });

  const { data: rating } = useQuery<
    RecommendResponse<Rating>,
    AxiosError,
    Rating
  >({
    queryKey: ["areaRating", areaId],
    queryFn: async () => {
      const response = await api.area.getAreaRating(areaId);
      if (!response) {
        throw new Error("응답값이 없습니다.");
      }
      return response;
    },
    select: ({ data }) => {
      const rating = calcRatings(data);
      if (!rating) {
        throw new Error("반환할 값이 없습니다.");
      }

      return { rating, pieces: data.pieces };
    },
  });

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        area &&
        rating && (
          <section className="container overflow-x-hidden h-full max-w-[375px] flex-col relative">
            <AreaDetailCard area={area} rating={rating} />
            {/* <Tab /> */}
            <ReviewSummaryCard rating={rating} />
            <AreaReviewCard
              name="홍길동"
              imageUrl={"/"}
              createdAt={"123"}
              rating={rating.rating}
            />
            <UnderBar />
          </section>
        )
      )}
    </>
  );
}

export default AreaDetailPage;
