"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import Tab from "@/components/Tab/Tab";
import { ICON } from "@/constants/icon";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import { Area, AreaReview, GroupedArea } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { lazy, useEffect, useMemo, useRef } from "react";
import { useInView } from "react-intersection-observer";
import AreaDetailCard from "../AreaPage/AreaDetailCard";
import UnderBar from "../AreaPage/UnderBar";
import CardImgFrame from "../Cards/CardImgFrame";
const SimilarAreaCard = lazy(() => import("../Cards/SimilarAreaCard"));
const ReviewSummaryCard = lazy(() => import("../AreaPage/ReviewSummary"));
const NoticeForm = lazy(() => import("../AreaPage/NoticeForm"));
const LocationForm = lazy(() => import("../AreaPage/LocationForm"));
const AreaReviewCard = lazy(() => import("../AreaPage/AreaReviewCard"));

type AreaDetailCSRPage = {
  areaId: number;
};
function AreaDetailCSRPage({ areaId }: AreaDetailCSRPage) {
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.areaDetail });
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reviewSectionRef = useRef<HTMLDivElement | null>(null);

  const { data: area, isLoading } = useQuery<Area>({
    queryKey: ["area", areaId],
    queryFn: async () => {
      const { data } = await api.area.getAreasById(areaId);
      return data;
    },
  });
  const { data: areas } = useQuery<GroupedArea, AxiosError, Area[]>({
    queryKey: ["areas", area?.cityId],
    queryFn: async () => {
      const { data } = await api.area.getAreasByCity(area?.cityId!, 4);
      return data;
    },
    select: (data) => {
      return data[area?.type as keyof GroupedArea];
    },
  });
  const { data: areaReviews } = useQuery<AreaReview[]>({
    queryKey: ["areaReviews", areaId],
    queryFn: async () => {
      const { data } = await api.review.getReviews(areaId);
      return data;
    },
  });

  const sortedAreaReviews = useMemo(() => {
    return areaReviews?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [areaReviews]);

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
        backgroundColor: inView ? "transparentFixed" : "whiteFixed",
        title: inView ? "" : area?.krName!,
        titleAlign: "center",
        rightIcons: [
          {
            icon: inView ? ICON.shareArea.white : ICON.shareArea.black,
            alt: "share",
            size: 20,
            onClick: () => alert("구현 중입니다."),
          },
        ],
      }}
    >
      {area && (
        <main className="h-full w-full relative container">
          <div ref={ref}>
            <CardImgFrame
              imageUrl={area?.imageUrl}
              alt={area.title}
              frameClassName="-z-50 -mb-11 aspect-4/5"
              imageClassName="object-cover"
              isTop={true}
              country={area.info?.location[0]}
              city={area.info?.location[1]}
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
                  rating={area.rating ?? 0}
                  ratingAmount={areaReviews?.length || 0}
                  areaId={areaId}
                />
                {sortedAreaReviews &&
                  sortedAreaReviews?.map((review, idx) => {
                    return (
                      <AreaReviewCard
                        key={review.id}
                        userImageUrl={review.profileImg}
                        name={review.nickname}
                        imageUrl={review.imageUrls[0]}
                        createdAt={review.createdAt}
                        rating={review.rating!}
                        description={review.content!}
                        reviewInfo={review}
                      />
                    );
                  })}
              </div>
              {areas && (
                <div
                  ref={(tabEl) => {
                    sectionRefs.current[3] = tabEl;
                  }}
                  className="mb-9 pt-8 pb-7 px-4 w-full h-full rounded-lg shadow-area-section"
                >
                  <section className="w-full flex flex-col gap-y-7">
                    <h1 className="text-lg font-medium min-w-20">
                      비슷한 장소 둘러보기
                    </h1>
                    <div className="w-full grid grid-cols-2 gap-x-3 gap-y-4">
                      {areas?.map((area: Area, idx) => {
                        if (idx < 4) {
                          return (
                            <SimilarAreaCard
                              rating={area.rating ?? 0}
                              key={area.id}
                              title={area.krName!}
                              imageUrl={area.imageUrl ?? "/"}
                              linkUrl={`/recommend/area/${area.id}`}
                              type={area.type!}
                            />
                          );
                        }
                      })}
                    </div>
                  </section>
                </div>
              )}
            </div>
            <UnderBar area={area} />
          </section>
        </main>
      )}
    </MainLayout>
  );
}

export default AreaDetailCSRPage;
