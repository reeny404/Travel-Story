"use client";

import SlideTagList from "@/components/commons/TagList/SlideTagList";
import { LatLng } from "@/types/LatLng";
import { DateUtil } from "@/utils/DateUtil";
import { useCallback, useMemo } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Map from "./_components/Map";
import RouteCard, { Route } from "./_components/RouteCard";

const routes: LatLng[] = [
  { lat: 37.5363, lng: 126.977 },
  { lat: 37.3993, lng: 125.977 },
  { lat: 35.3393, lng: 126.977 },
  { lat: 36.3143, lng: 128.977 },
];

const startDate = "2024-07-16";
const endtDate = "2024-07-19";

const schedule: Route = {
  index: 0,
  title: "La Casetta a Monti",
  address: "콜로세움 근처",
  openTime: "10:30am - 12:30pm",
  imageUrl: null,
};

function PlanRoutePage() {
  // TODO schedule 의 위경도 목록을 가져오는 방식으로 변경해야 함
  const tags: string[] = useMemo(() => {
    const gapDays = DateUtil.getGapDay(new Date(startDate), new Date(endtDate));
    return new Array(gapDays).fill(0).map((_, i) => `${i + 1}일차`);
  }, []);

  const onTagClick = useCallback((tag: string) => {
    // 클릭할 때마다 해당 일자의 스케줄을 가져와서 다시 그려야 함
  }, []);

  return (
    <section>
      <Map locations={routes}></Map>
      <div className="fixed bottom-4 w-[375px] mx-2">
        <Swiper
          spaceBetween={0}
          slidesPerView="auto"
          grabCursor={true}
          className="mb-2"
        >
          {routes.map((route, i) => (
            <SwiperSlide key={i}>
              <RouteCard route={{ ...schedule, index: i + 1 }} />
            </SwiperSlide>
          ))}
        </Swiper>
        <SlideTagList
          theme="white"
          tagList={tags}
          onTagClick={onTagClick}
          spacing={3}
        />
      </div>
    </section>
  );
}

export default PlanRoutePage;
