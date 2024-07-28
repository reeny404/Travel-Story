"use client";

import { api } from "@/apis/api";
import ImageContainer from "@/components/Card/ImageContainer";
import Tab from "@/components/Tab/Tab";
import { useTab } from "@/hooks/useTab";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

function AreaDetailPage() {
  const pathname = usePathname();
  const areaId = parseInt(pathname.split("/").slice(-1)[0]);
  const { currentTab } = useTab();

  const { data: area, isLoading } = useQuery({
    queryKey: ["area", areaId],
    queryFn: () => api.area.getAreasById(areaId),
    select: (data) => data?.data,
  });

  const convertTypeToKr = (type: string) => {
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
  };
  // json 타입 관련 오류 해결해야됨
  console.log("area", currentTab);

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        area && (
          <section className="container overflow-x-hidden w-screen h-full max-w-[375px] mx-auto flex-col">
            <h1 className="w-full p-3 text-xl font-bold">{area?.title}</h1>
            <div className="w-full h-full">
              <ImageContainer
                size="area"
                imageUrl={area?.imageUrl! || "/123"}
                isTitle
              />
              <p className="p-3 flex justify-between items-center font-semibold">
                <span>{convertTypeToKr(area.type!)}</span>
                <span>별점</span>
              </p>
              <p className="px-3 flex justify-between items-center font-semibold">
                <span>영업중</span>
                <span>
                  {area.info?.opening_hours.open} ~
                  {area.info?.opening_hours.close}
                </span>
              </p>
              <p className="px-3 py-6 font-semibold">{area.description}</p>
            </div>
            <Tab />
          </section>
        )
      )}
    </>
  );
}

export default AreaDetailPage;
