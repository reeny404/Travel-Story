"use client";

import SlideTagList from "@/components/commons/TagList/SlideTagList";
import { LatLng } from "@/types/LatLng";
import { DateUtil } from "@/utils/DateUtil";
import clsx from "clsx";
import { useCallback, useMemo } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Map from "./_components/Map";
import RouteCard, { Route } from "./_components/RouteCard";

const schedules: Route[] = [
  {
    index: 0,
    title: "라 카세타 어 몬티",
    type: "식당",
    address: "Via Madonna Dei Monti 62, 00184 R oma casa Rome",
    openTime: "10:30am - 12:30pm",
    // latlng: { lat: 37.5363, lng: 126.977 },
    latlng: { lat: 48.8557305, lng: 2.3307723 },
    imageUrl:
      "https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/plan/routeSample.png",
  },
  {
    index: 1,
    title: "르 프루아르 다르장",
    type: "관광지",
    address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
    openTime: "10:30am - 12:30pm",
    // latlng: { lat: 37.3993, lng: 125.977 },
    latlng: { lat: 48.8262206, lng: 2.1754027 },
    imageUrl:
      "https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/plan/unsplash_WBp_-NFQvEQ.png",
  },
  {
    index: 3,
    title: "그랜드 호텔 벨뷰",
    type: "호텔",
    address: "23 Rue Georges Bonnac, 33000 Bordeaux, France",
    openTime: "10:30am - 12:30pm",
    // latlng: { lat: 36.3143, lng: 128.977 },
    latlng: { lat: 48.7514291, lng: 2.200225 },
    imageUrl:
      "https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/plan/Component%2063.png",
  },
  {
    index: 4,
    title: "르 봉 마르셰",
    type: "쇼핑",
    address: "Tour Eiffel, Avenue Gustave Eiffel, 75007 Paris, France",
    openTime: "10:30am - 12:30pm",
    // latlng: { lat: 35.3393, lng: 126.977 },
    latlng: { lat: 48.8195563, lng: 2.5268488 },
    imageUrl:
      "https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/plan/routeSample.png",
  },
  {
    index: 5,
    title: "쎄나흐 산림 공원",
    type: "관광지",
    address: "Forêt domaniale de Sénart",
    openTime: "10:30am - 12:30pm",
    // latlng: { lat: 35.3393, lng: 126.977 },
    latlng: { lat: 48.6674541, lng: 2.477182 },
    imageUrl:
      "https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/plan/AF1QipPBX1o6pF5Qw558E6sR2Wyb2dKin9x9jUV6X1iI=s512.jpg",
  },
];

function PlanRoutePage() {
  const onTagClick = useCallback((tag: string) => {
    // TODO 클릭할 때마다 해당 일자의 스케줄을 가져와서 다시 그려야 함
  }, []);

  const tags: string[] = useMemo(() => {
    const gapDay = DateUtil.getGapDay(
      new Date("2024-08-02"),
      new Date("2024-08-04")
    );
    // 당일 치기 여행은 n일차 탭 필요하지 않음
    return new Array(gapDay ? gapDay + 1 : 0)
      .fill(0)
      .map((_, i) => `${i + 1}일차`);
  }, []);

  const routes: LatLng[] = useMemo(() => {
    return schedules.map((schedule) => schedule.latlng);
  }, []);
  console.log(schedules);

  return (
    <section>
      <Map locations={routes}></Map>
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
              <RouteCard route={{ ...schedule, index: i + 1 }} />
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
