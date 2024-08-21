"use client";
import { useAuth } from "@/contexts/auth.contexts";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

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
    const getRecentArea = async (): Promise<number[] | undefined> => {
      if (isInitialized && user) {
        const { data, error } = await supabase
          .from("recents")
          .select("area")
          .eq("id", user.id);

        if (error) {
          console.error(error);
        }

        const recentList = data?.[0]?.area ?? [];
        return recentList as number[];
      }
      return undefined;
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
    <div className="w-full text-primary font-semibold z-10">
      <p className="px-4 py-[10px] md:text-xl md:mb-[6px]">최근 본 장소</p>
      <Swiper spaceBetween={12} slidesPerView="auto" grabCursor={true}>
        {recentList ? (
          recentList.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className={`${index === 0 ? "ml-4" : ""} w-[124px] md:w-[190px]`}
              >
                <div
                  className="relative w-[124px] h-[184px] cursor-pointer md:w-[190px] md:h-[300px]"
                  onClick={() => handleClickCard(index)}
                >
                  <Image
                    src={item.imageUrl || ""}
                    alt="장소 사진"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <p className="absolute w-full px-4 bottom-4 text-white font-semibold overflow-hidden text-ellipsis md:text-xl">
                    {item.krName}
                  </p>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <div className="w-full h-full grid place-items-center bg-white bg-opacity-30 rounded-lg">
            <p className="font-medium">최근 본 장소가 없습니다</p>
          </div>
        )}
      </Swiper>
    </div>
  );
}

export default RecentArea;
