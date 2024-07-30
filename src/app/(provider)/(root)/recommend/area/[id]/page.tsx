"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import Tab from "@/components/Tab/Tab";
import { ICON } from "@/constants/Icon";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import { createClient } from "@/supabase/client";
import { Area, AreaReview, Rating, RecommendResponse } from "@/types/Recommend";
import { calcRatings } from "@/utils/calcRatings";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import AreaDetailCard from "../../_components/AreaPage/AreaDetailCard";
import AreaReviewCard from "../../_components/AreaPage/AreaReviewCard";
import NoticeForm from "../../_components/AreaPage/NoticeForm";
import ReviewSummaryCard from "../../_components/AreaPage/ReviewSummary";
import UnderBar from "../../_components/AreaPage/UnderBar";
import Liner from "../../_components/Liner";

type AreaDetailPage = {
  params: { id: string };
};
function AreaDetailPage({ params }: AreaDetailPage) {
  const areaId = parseInt(params.id);
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.areaDetail });
  const supabase = createClient();
  const { data: userInfo } = useQuery({
    queryKey: ["user"],
    queryFn: () => supabase.auth.getUser(),
  });
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
    queryFn: () => api.review.getReviews(areaId),
    select: (data) => data.data,
  });

  // userId가 의존키로 들어가야함
  const { data: userReviews } = useQuery<RecommendResponse<AreaReview[]>>({
    queryKey: ["userReviews"],
    queryFn: () =>
      api.review.getReviewsByUser("80bf108c-63c1-43ce-b463-92b9a0915f0d"),
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
        title: area?.krName!,
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
                    name={userInfo?.data.user?.user_metadata.nickname}
                    imageUrl={review.imageUrls[0]}
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
    </MainLayout>
  );
}

export default AreaDetailPage;
