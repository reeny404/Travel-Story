"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import Tab from "@/components/Tab/Tab";
import { ICON } from "@/constants/icon";
import { TABS } from "@/constants/tabs";
import { useAuth } from "@/contexts/auth.contexts";
import { useTab } from "@/hooks/useTab";
import useDrawerStore from "@/stores/drawer.store";
import { Area, AreaReview, RecommendResponse } from "@/types/Recommend";
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
  const { openDrawer } = useDrawerStore();
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
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        leftIcons: [
          {
            icon: ICON.arrow.back.black,
            alt: "Back",
            size: 20,
            path: "back",
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
            onClick: openDrawer,
          },
        ],
      }}
    >
      {area && (
        <section className="relative container h-full">
          <AreaDetailCard area={area} ratingAmount={areaReviews?.length || 0} />
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
              rating={area.rating!}
              ratingAmount={areaReviews?.length || 0}
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
                    rating={area.rating!}
                    description={review.content!}
                  />
                );
              })}
          </div>
          <UnderBar area={area} />
        </section>
      )}
    </MainLayout>
  );
}

export default AreaDetailPage;
