"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import Tab from "@/components/Tab/Tab";
import WebTap from "@/components/Tab/WebTab";
import { ICON } from "@/constants/icon";
import { TABS } from "@/constants/tabs";
import { useAuth } from "@/contexts/auth.contexts";
import { useTab } from "@/hooks/useTab";
import { useRecentStore } from "@/stores/recent.store";
import { createClient } from "@/supabase/client";
import { Area, AreaReview, GroupedArea } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { lazy, useEffect, useMemo, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useWindowSize } from "../../../_hook/useWindowSize";
import AreaDetailCard from "../AreaPage/AreaDetailCard";
import ReviewList from "../AreaPage/ReviewList";
import UnderBar from "../AreaPage/UnderBar";
import WebLocationForm from "../AreaPage/WebLocationForm";
import WebReviewForm from "../AreaPage/WebReviewForm";
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
  const { width } = useWindowSize();

  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reviewSectionRef = useRef<HTMLDivElement | null>(null);
  const supabase = createClient();
  const { isInitialized, user } = useAuth();
  const { recentArea, setRecentArea } = useRecentStore();

  useEffect(() => {
    const upsertArea = async () => {
      let prevArea = [...recentArea];
      prevArea = prevArea.filter((area) => {
        return area !== areaId;
      });
      if (prevArea.length === 10) {
        prevArea.shift();
      }
      const areaArray = [...prevArea, areaId];
      setRecentArea(areaArray);
      if (isInitialized && user) {
        const { data, error } = await supabase.from("recents").upsert(
          [
            {
              user_id: user.id,
              area: areaArray,
            },
          ],
          {
            onConflict: "id",
          }
        );
        if (error) {
          console.error(error);
        }
      }
    };
    upsertArea();
  }, []);

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
      const { data } = await api.area.getAreasByCity(area?.cityId!, 6);
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
        <main className="h-full w-full relative container mx-auto">
          <div ref={ref}>
            <CardImgFrame
              imageUrl={area?.imageUrl}
              alt={area.title}
              frameClassName="-z-10 -mb-11 aspect-4/5 sm:aspect-video sm:-mb-4"
              imageClassName="object-cover"
              isTop={true}
              country={area.info?.location[0]}
              city={area.info?.location[1]}
              areaName={area.name}
            />
          </div>
          <section className="w-full h-full p-4 pb-0 sm:p-0">
            <div className="w-full h-full rounded-t-lg sm:rounded-t-none ">
              <AreaDetailCard
                area={area}
                reviewSectionRef={reviewSectionRef}
                ratingAmount={areaReviews?.length || 0}
              />
              <Tab
                TABS={TABS.areaDetail}
                currentTab={currentTab!}
                setCurrentTab={setCurrentTab}
                frameClassName="top-[56px] shadow-area-section md:hidden"
              />
              <div className="hidden md:block shadow-area-section w-full my-6">
                <WebTap
                  currentTab={currentTab!}
                  setCurrentTab={setCurrentTab}
                  TABS={TABS.areaDetail}
                />
              </div>
              <div className="lg:flex gap-x-5 lg:h-[283px] ">
                <div
                  ref={(tabEl) => {
                    sectionRefs.current[0] = tabEl;
                  }}
                  className="mb-3 w-full h-full rounded-lg shadow-area-section lg:max-w-[334px]"
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
                  <WebLocationForm area={area} />
                </div>
              </div>
              <div
                ref={(tabEl) => {
                  sectionRefs.current[2] = tabEl;
                  reviewSectionRef.current = tabEl;
                }}
                className="w-full h-full md:hidden rounded-lg shadow-area-section"
              >
                <ReviewSummaryCard
                  areaName={area.krName!}
                  rating={area.rating ?? 0}
                  ratingAmount={areaReviews?.length || 0}
                  areaId={areaId}
                />
                {sortedAreaReviews && (
                  <ReviewList width={width} reviews={sortedAreaReviews} />
                )}
              </div>
              <div>
                <WebReviewForm
                  width={width}
                  area={area}
                  reviews={areaReviews}
                />
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
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-4 sm:gap-8">
                      {areas?.map((area: Area, idx) => {
                        if (width <= 768 && idx === 4) {
                          return;
                        }
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
