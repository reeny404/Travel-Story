"use client";

import { api } from "@/apis/api";
import SlideTagList from "@/components/commons/TagList/SlideTagList";
import { LatLng } from "@/types/LatLng";
import { PlanFull } from "@/types/plan";
import { DateUtil } from "@/utils/DateUtil";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Map from "./_components/Map";
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

  const tags: string[] = new Array(
    DateUtil.getGapDayByString(plan?.startDate, plan?.endDate) || 1
  )
    .fill(0)
    .map((_, i) => `${i + 1}일차`);

  if (!plan) {
    return (
      <div className="h-screen flex justify-center items-center">
        로딩 중입니다.
      </div>
    );
  }

  const { schedules } = plan;
  const routes: LatLng[] = plan?.schedules.map(
    (schedule) => schedule.latlng as LatLng
  );

  if (schedules.length === 0) {
    return (
      <div className="h-screen space-y-4 flex flex-col justify-center items-center">
        <span>경로를 그릴 수 있는 위치 정보가 없습니다.</span>
        <span>일정을 보다 풍부하게 꾸며주세요</span>
        <Link href={`/plan/${planId}`} className="px-4 py-2 bg-lime-400">
          추가 계획하기
        </Link>
      </div>
    );
  }

  return (
    <section>
      <h2 className="hidden">여행 계획에 따른 지도 경로 보기</h2>
      {routes.length && <Map locations={routes}></Map>}
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
