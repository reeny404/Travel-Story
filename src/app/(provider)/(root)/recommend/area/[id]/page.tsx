"use client";

import { api } from "@/apis/api";
import Tab from "@/components/Tab/Tab";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import { Area, AreaReview, Rating, RecommendResponse } from "@/types/Recommend";
import { calcRatings } from "@/utils/calcRatings";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname } from "next/navigation";
import AreaDetailCard from "../../_components/AreaPage/AreaDetailCard";
import AreaReviewCard from "../../_components/AreaPage/AreaReviewCard";
import NoticeForm from "../../_components/AreaPage/NoticeForm";
import ReviewSummaryCard from "../../_components/AreaPage/ReviewSummary";
import UnderBar from "../../_components/AreaPage/UnderBar";
import Liner from "../../_components/Liner";

function AreaDetailPage() {
  const pathname = usePathname();
  const areaId = parseInt(pathname.split("/").slice(-1)[0]);

  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.areaDetail });

  const { data: area, isLoading } = useQuery<
    RecommendResponse<Area>,
    AxiosError,
    Area
  >({
    queryKey: ["areasById", areaId],
    queryFn: () => api.area.getAreasById(areaId),
    select: (data) => data.data,
  });

  const { data: areaReviews } = useQuery<
    RecommendResponse<AreaReview[]>,
    AxiosError,
    AreaReview[]
  >({
    queryKey: ["areaReviews", areaId],
    queryFn: () => api.area.getReviews(areaId),
    select: (data) => data.data,
  });

  const { data: rating } = useQuery<Rating>({
    queryKey: ["areaRating", areaId],
    queryFn: async () => {
      const response = await api.area.getAreaRating(areaId);
      if (!response?.data) {
        return { rating: 0, pieces: 0 };
      }
      const { rating, pieces } = calcRatings(response.data);
      return { rating, pieces };
    },
  });

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        area &&
        rating && (
          <section className="relative container overflow-x-hidden h-full max-w-[375px] flex-col">
            <AreaDetailCard area={area} rating={rating} />
            <Liner />
            <Tab
              TABS={TABS.areaDetail}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            <Liner />
            <NoticeForm area={area} />
            <Liner />
            <ReviewSummaryCard rating={rating} />
            <Liner />
            {areaReviews &&
              areaReviews?.map((review, idx) => {
                return (
                  <AreaReviewCard
                    key={idx}
                    userImageUrl="/"
                    name="홍길동"
                    imageUrl={areaReviews[0].imageUrls[0]}
                    createdAt={review.createdAt}
                    rating={rating.rating}
                    description={review.content!}
                  />
                );
              })}

            <UnderBar />
          </section>
        )
      )}
    </>
  );
}

export default AreaDetailPage;
