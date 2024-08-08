"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import Tab from "@/components/Tab/Tab";
import { ICON } from "@/constants/icon";
import { TABS } from "@/constants/tabs";
import { useAuth } from "@/contexts/auth.contexts";
import { useTab } from "@/hooks/useTab";
import { Area, AreaReview, RecommendResponse } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import AreaDetailCard from "../AreaPage/AreaDetailCard";
import AreaReviewCard from "../AreaPage/AreaReviewCard";
import LocationForm from "../AreaPage/LocationForm";
import NoticeForm from "../AreaPage/NoticeForm";
import ReviewSummaryCard from "../AreaPage/ReviewSummary";
import UnderBar from "../AreaPage/UnderBar";
import CardImgFrame from "../Cards/CardImgFrame";

type AreaDetailCSRPage = {
  areaId: number;
};
function AreaDetailCSRPage({ areaId }: AreaDetailCSRPage) {
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.areaDetail });
  const { ref, inView } = useInView();
  const { user } = useAuth();
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reviewSectionRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleSearch = () => {
    return router.push(`/search`);
  };

  const { data: area, isLoading } = useQuery<
    RecommendResponse<Area>,
    AxiosError,
    Area
  >({
    queryKey: ["area", areaId],
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
        backgroundColor: inView ? "transparent" : "whiteFixed",
        title: inView ? "" : area?.krName!,
        titleAlign: "center",
        rightIcons: [
          {
            icon: inView ? ICON.shareArea.white : ICON.shareArea.black,
            alt: "share",
            size: 20,
            onClick: () => handleSearch(),
          },
        ],
      }}
    >
      {area && (
        <main className="h-full w-full relative container">
          <div ref={ref}>
            <CardImgFrame
              imageUrl={area.imageUrl}
              alt={area.title}
              frameClassName="-z-50 -mb-11 aspect-4/5"
              imageClassName="object-cover"
              isTop={true}
              country={area.info.location[0]}
              city={area.info.location[1]}
              areaName={area.name}
            />
          </div>
          <section className="w-full h-full p-4 pb-0">
            <div className="w-full h-full bg-white rounded-t-lg">
              <AreaDetailCard
                area={area}
                reviewSectionRef={reviewSectionRef}
                ratingAmount={areaReviews?.length || 0}
              />
              <Tab
                TABS={TABS.areaDetail}
                currentTab={currentTab!}
                setCurrentTab={setCurrentTab}
                frameClassName="top-[56px] shadow-area-section"
              />
              <div
                ref={(tabEl) => {
                  sectionRefs.current[0] = tabEl;
                }}
                className="mb-3 w-full h-full rounded-lg shadow-area-section"
              >
                <NoticeForm area={area} />
              </div>
              <div
                ref={(tabEl) => {
                  sectionRefs.current[1] = tabEl;
                }}
                className="mb-3 w-full h-full rounded-lg shadow-area-section"
              >
                <LocationForm area={area} />
              </div>
              <div
                ref={(tabEl) => {
                  sectionRefs.current[2] = tabEl;
                  reviewSectionRef.current = tabEl;
                }}
                className="mb-3 w-full h-full rounded-lg shadow-area-section"
              >
                <ReviewSummaryCard
                  areaName={area.krName!}
                  rating={area.rating!}
                  ratingAmount={areaReviews?.length || 0}
                  areaId={areaId}
                />
                {areaReviews &&
                  areaReviews
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .map((review, idx) => {
                      return (
                        <AreaReviewCard
                          key={idx}
                          userImageUrl={user?.user_metadata.profileImg}
                          name={user?.user_metadata.nickname}
                          imageUrl={review.imageUrls[0]}
                          createdAt={review.createdAt}
                          rating={review.rating!}
                          description={review.content!}
                          reviewInfo={review}
                        />
                      );
                    })}
              </div>
            </div>
            <UnderBar area={area} />
          </section>
        </main>
      )}
    </MainLayout>
  );
}

export default AreaDetailCSRPage;
