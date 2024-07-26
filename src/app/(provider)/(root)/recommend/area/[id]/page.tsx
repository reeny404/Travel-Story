"use client";

import { api } from "@/apis/api";
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
  console.log("area", area);

  return (
    <div className="container overflow-x-hidden w-screen h-screen max-w-[375px] mx-auto flex-col"></div>
  );
}

export default AreaDetailPage;
