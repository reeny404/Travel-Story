"use client";

import { api } from "@/apis/api";
import ImageContainer from "@/components/Card/ImageContainer";
import RatingIcons from "@/components/Card/RatingIcons";
import { useTab } from "@/hooks/useTab";
import { Rating, RecommendResponse } from "@/types/Recommend";
import { calcRatings } from "@/utils/calcRatings";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

const BOOKMARK_DATA = {
  userId: "66ec615f-1dd3-45df-83b6-2e178b5abbc3",
  areaId: 1,
};

function AreaDetailPage() {
  const pathname = usePathname();
  const areaId = parseInt(pathname.split("/").slice(-1)[0]);

  const { currentTab } = useTab();

  const { data: area, isLoading } = useQuery({
    queryKey: ["area", areaId],
    queryFn: () => api.area.getAreasById(areaId),
    select: (data) => data?.data,
  });

  const { data: rating } = useQuery<
    RecommendResponse<Rating>,
    AxiosError,
    Rating
  >({
    queryKey: ["areaRating", areaId],
    queryFn: async () => {
      const response = await api.area.getAreaRating(areaId);
      if (!response) {
        throw new Error("응답값이 없습니다.");
      }
      return response;
    },
    select: ({ data }) => {
      const rating = calcRatings(data);
      if (!rating) {
        throw new Error("반환할 값이 없습니다.");
      }

      return { rating, pieces: data.pieces };
    },
  });

  const convertTypeToKr = useCallback((type: string) => {
    if (type === "restaurant") {
      return "식당";
    }
    if (type === "place") {
      return "관광지";
    }
    if (type === "accommodation") {
      return "숙소";
    }
    if (type === "shop") {
      return "쇼핑";
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        area &&
        rating && (
          <section className="container overflow-x-hidden w-screen h-full max-w-[375px] mx-auto flex-col relative">
            <h1 className="w-full p-3 text-xl font-bold">{area?.title}</h1>
            <div className="w-full h-full">
              <ImageContainer
                size="area"
                imageUrl={area?.imageUrl! || "/123"}
                isTitle
              />
              <p className="p-3 flex justify-between items-center font-semibold">
                <span>{convertTypeToKr(area.type!)}</span>
                <div>
                  <RatingIcons rating={rating.rating} />
                </div>
              </p>
              <p className="px-3 flex justify-between items-center font-semibold">
                <span>영업중</span>
                <span>
                  {/* {area.info?.opening_hours.open} ~
                  {area.info?.opening_hours.close} */}
                </span>
              </p>
              <p className="px-3 py-6 font-semibold">{area.description}</p>
            </div>
            {/* <Tab /> */}
            <div className="w-full">
              <div className="w-full flex justify-between p-3">
                <span className="text-lg font-bold">리뷰</span>
                <button
                  onClick={() => console.log("리뷰 작성")}
                  className="text-sm font-bold flex items-center aspect-auto"
                >
                  {" "}
                  <Image
                    src="/icon/edit.svg"
                    alt="edit"
                    width={12}
                    height={12}
                    className="mr-1 object-contain"
                  />
                  <span>리뷰작성</span>
                </button>
              </div>
              <div className="w-full grid grid-cols-2 p-3">
                <div className="flex flex-col gap-y-2 items-center justify-center">
                  <p className="text-3xl">{rating.rating}</p>
                  <div>
                    <RatingIcons rating={rating.rating} />
                  </div>
                  <p className="text-xm text-[#8B8B8B]">{`(2)`}</p>
                </div>
                <div className="flex flex-col gap-y-1 p-1  justify-center">
                  <p className="flex gap-x-1 text-sm font-semibold relative">
                    <Image
                      src="/icon/delicious.png"
                      alt="image"
                      width={15}
                      height={15}
                      className="object-contain"
                    />
                    <span>음식이 맛있어요</span>
                  </p>
                  <p className="flex gap-x-1 text-sm font-semibold">
                    {" "}
                    <Image
                      src="/icon/clean.png"
                      alt="image"
                      width={15}
                      height={15}
                      className="object-contain"
                    />
                    <span>시설이 청결해요</span>
                  </p>
                  <p className="flex gap-x-1 text-sm font-semibold">
                    {" "}
                    <Image
                      src="/icon/cool.png"
                      alt="image"
                      width={15}
                      height={15}
                      className="object-contain"
                    />
                    <span>인테리어가 멋져요</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full h-full p-3 flex flex-col gap-y-3">
              <div className="flex justify-around w-full">
                <div className="w-16 h-16 bg-white opacity-70 rounded-full relative aspect-auto">
                  <Image
                    src={area.imageUrl!}
                    alt="image"
                    sizes="width"
                    fill
                    className="rounded-full object-cover w-auto h-auto"
                  />
                </div>
                <div className="flex flex-col justify-center gap-y-1 w-2/3 ml-5 relation">
                  <h1 className="text-sm font-bold">홍길동</h1>
                  <p className="text-xs font-semibold">createdAt</p>
                </div>
              </div>
              <div className="mt-4">
                <RatingIcons rating={rating.rating} />
              </div>
              <div className="w-full text-xs text-ellipsis line-clamp-3">
                리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용
                리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용
                리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용
                리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용
                리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용
              </div>
              <div className="w-full relative aspect-square">
                <Image
                  src={area.imageUrl!}
                  alt="image"
                  fill
                  className="object-cover w-full"
                />
              </div>
            </div>
            <div className="w-full h-10 px-3 flex gap-x-2 fixed bottom-0">
              <button
                onClick={() => {}}
                className="w-14 h-full bg-blue-500 border rounded-md"
              >
                북
              </button>
              <button className="w-72 h-full bg-gray-300 border rounded-md">
                내 여행에 추가
              </button>
            </div>
          </section>
        )
      )}
    </>
  );
}

export default AreaDetailPage;
