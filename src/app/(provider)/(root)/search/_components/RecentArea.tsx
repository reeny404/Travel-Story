"use client";
import { useAuth } from "@/contexts/auth.contexts";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type RecentArea = {
  id: number;
  krName: string | null;
  imageUrl: string | null;
}[];

function RecentArea() {
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
      <p className="px-4 py-[10px]">최근 본 장소</p>
      <Swiper spaceBetween={12} slidesPerView={2.9} grabCursor={true}>
        <div className="flex w-full h-[184px]">
          {recentList ? (
            recentList.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className={`${index === 0 ? "ml-4" : ""}`}
                >
                  <div
                    className="relative h-[184px] w-[124px] cursor-pointer"
                    onClick={() => handleClickCard(index)}
                  >
                    <Image
                      src={item.imageUrl || ""}
                      alt="장소 사진"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <p className="absolute w-full px-4 bottom-4 text-white font-semibold overflow-hidden text-ellipsis">
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
        </div>
      </Swiper>
    </div>
  );
}

export default RecentArea;
