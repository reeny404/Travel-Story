"use client";

import { api } from "@/apis/api";
import SlideTagList from "@/components/commons/TagList/SlideTagList";
import { LatLng } from "@/types/LatLng";
import { PlanFull } from "@/types/plan";
import { DateUtil } from "@/utils/DateUtil";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../../_components/Loading";
import Map from "./_components/Map";
import { NotFoundRoute } from "./_components/NotFoundRoute";
import RouteCard from "./_components/RouteCard";

type RoutePageProps = { params: { planId: string } };

function PlanRoutePage({ params: { planId } }: RoutePageProps) {
  const [plan, setPlan] = useState<PlanFull | null>(null);

  useEffect(() => {
    api.plan.find(planId, 1).then((data) => setPlan(data));
  }, [planId]);

  const onTagClick = useCallback(
    (tag: string) => {
      const dayIndex = Number(tag.replace("일차", ""));
      if (isNaN(dayIndex)) {
        alert("오류로 인해 일자를 불러오지 못했어요");
        return;
      }

      api.plan.find(planId, dayIndex).then((data) => setPlan(data));
    },
    [planId]
  );

  if (!plan) {
    return <Loading />;
  }

  const tags: string[] = new Array(
    DateUtil.getGapDayByString(plan.startDate, plan.endDate)
  )
    .fill(0)
    .map((_, i) => `${i + 1}일차`);

  const { schedules } = plan;
  const routes: LatLng[] = plan?.schedules.map(
    (schedule) => schedule.latlng as LatLng
  );

  return (
    <section>
      <h2 className="hidden">여행 계획에 따른 지도 경로 보기</h2>
      <Map locations={routes} />
      {!schedules.length && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-default">
          <NotFoundRoute planId={planId} />
        </div>
      )}
      <div className="h-0 relative bottom-52">
        <Swiper
          spaceBetween={10}
          slidesPerView={1.2}
          grabCursor={true}
          className="mb-2"
        >
          {schedules.map((schedule, i) => (
            <SwiperSlide
              key={i}
              className={clsx({
                "ml-3": i === 0,
                "mr-3": i === schedules.length - 1,
              })}
            >
              <RouteCard index={i + 1} schedule={schedule} />
            </SwiperSlide>
          ))}
        </Swiper>
        <SlideTagList
          theme="white"
          size="md"
          tagList={tags}
          onTagClick={onTagClick}
          spacing={0}
        />
      </div>
    </section>
  );
}

export default PlanRoutePage;
