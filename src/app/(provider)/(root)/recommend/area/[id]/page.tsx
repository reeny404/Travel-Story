"use client";

import { api } from "@/apis/api";
import ImageContainer from "@/components/Card/ImageContainer";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

function AreaDetailPage() {
  const pathname = usePathname();
  const areaId = parseInt(pathname.split("/").slice(-1)[0]);

  const { data: area } = useQuery({
    queryKey: ["area", areaId],
    queryFn: () => api.area.getAreasById(areaId),
    select: (data) => data?.data,
  });

  // 타입 관련 오류 해결해야됨

  return (
    <div className="container overflow-x-hidden w-screen h-screen max-w-[375px] mx-auto flex-col">
      <ImageContainer imageUrl={area?.imageUrl! || "/123"} isTitle />
      <p>
        {" "}
        {area?.krName}
        {area?.description} {area?.info?.notes as string}
      </p>
    </div>
  );
}

export default AreaDetailPage;
