"use client";
import { useAuth } from "@/contexts/auth.contexts";
import { createClient } from "@/supabase/client";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SearchPageTitle from "./SearchPageTitle";

type RecentArea = {
  id: number;
  krName: string | null;
  imageUrl: string | null;
}[];

type RecentAreaProps = {
  className?: string;
  isInitial?: boolean;
};

function RecentArea({ className, isInitial }: RecentAreaProps) {
  const supabase = createClient();
  const { isInitialized, user } = useAuth();
  const [recentList, setRecentList] = useState<RecentArea>();
  const router = useRouter();

  useEffect(() => {
    const getRecentArea = async () => {
      if (isInitialized && user) {
        const { data, error } = await supabase
          .from("recents")
          .select("area")
          .eq("id", user.id);

        if (error) {
          console.error(error);
        }

        const recentList = data?.[0]?.area ?? [];
        return recentList;
      }
    };
    const getAreaData = async () => {
      const recentArea = (await getRecentArea()) ?? [];
      const { data, error } = await supabase
        .from("area")
        .select("id, krName,imageUrl")
        .in("id", recentArea);

      if (error) {
        console.error(error);
      }
      if (data) {
        setRecentList(data);
      }
    };

    getAreaData();
  }, []);

  const handleClickCard = (index: number) => {
    if (recentList) router.push(`/recommend/area/${recentList[index].id}`);
  };

  return (
    <div className={`w-full text-primary font-semibold z-10`}>
      <SearchPageTitle title="최근 본 장소" className={className} />
      <Swiper
        spaceBetween={12}
        slidesPerView={2.8}
        grabCursor={true}
        breakpoints={{
          550: {
            slidesPerView: 3.8,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 4.5,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 32,
          },
        }}
      >
        <div className="flex w-full h-[184px] md:pl-8">
          {recentList && recentList.length > 0 ? (
            recentList.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className={clsx({
                    "ml-4": index === 0,
                    "md:ml-8": index === 0 && !isInitial,
                  })}
                >
                  <div
                    className="relative w-[124px] h-[184px] cursor-pointer md:w-[160px] md:h-[252px] lg:w-[190px] lg:h-[300px]"
                    onClick={() => handleClickCard(index)}
                  >
                    <Image
                      src={item.imageUrl || "/sampleImg.jpg"}
                      alt="장소 사진"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <p className="absolute w-full px-4 bottom-4 text-white font-semibold overflow-hidden text-ellipsis md:text-lg lg:text-xl">
                      {item.krName}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <div className="w-full h-full grid place-items-center bg-white bg-opacity-30 rounded-lg">
              <p className="text-sm font-medium md:text-base">
                최근 본 장소가 없습니다.
              </p>
            </div>
          )}
        </div>
      </Swiper>
    </div>
  );
}

export default RecentArea;
