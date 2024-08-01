"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import Tab from "@/components/Tab/Tab";
import { ICON } from "@/constants/icon";
import { TABS } from "@/constants/tabs";
import { useAuth } from "@/contexts/auth.contexts";
import { useTab } from "@/hooks/useTab";
import { Area, AreaReview, Rating, RecommendResponse } from "@/types/Recommend";
import { calcRatings } from "@/utils/calcRatings";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
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
  const { user } = useAuth();

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

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentTabIndex = TABS.areaDetail.findIndex(
      (tab) => tab.en === currentTab
    );
    if (sectionRefs.current[currentTabIndex]) {
      sectionRefs.current[currentTabIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentTab]);

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
          <section className="relative container h-full max-w-[375px]">
            <AreaDetailCard area={area} rating={rating} />
            <Liner />
            <Tab
              TABS={TABS.areaDetail}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            <Liner />
            <div
              ref={(tabEl) => {
                sectionRefs.current[0] = tabEl;
              }}
            >
              <NoticeForm area={area} />
              <Liner />
            </div>
            <div
              ref={(tabEl) => {
                sectionRefs.current[2] = tabEl;
              }}
            >
              <ReviewSummaryCard
                areaName={area.krName!}
                rating={rating}
                areaId={areaId}
              />
              <Liner />
            </div>
            <div>
              {areaReviews &&
                areaReviews.map((review, idx) => {
                  return (
                    <AreaReviewCard
                      key={idx}
                      userImageUrl="/"
                      name={user?.user_metadata.nickname}
                      imageUrl={review.imageUrls[0]}
                      createdAt={review.createdAt}
                      rating={rating.rating}
                      description={review.content!}
                    />
                  );
                })}
            </div>
            <UnderBar area={area} />
          </section>
        )
      )}
    </MainLayout>
  );
}

export default AreaDetailPage;
