import { getIconPath } from "@/components/commons/Icon/getIconPath";
import ImageFrame from "@/components/Frame/ImageFrame";
import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import { DateUtil } from "@/utils/DateUtil";
import Link from "next/link";
import { useMemo } from "react";
import CreatePlanButton from "./_components/CreatePlanButton";
import PlanList from "./_components/PlanList";

export default function PlanListPage() {
  const arrowIconPath = useMemo(() => getIconPath(ICON.arrow.down.black), []);
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "내 여행 리스트",
        titleAlign: "center",
        // rightIcons: [
        //   {
        //     icon: ICON.search.black,
        //     alt: "Search",
        //     path: "/",
        //     size: 20,
        //   },
        // ],
      }}
    >
      <div className="min-h-[calc(100dvh-52px)]">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg leading-6">
              {DateUtil.format("yyyy년 MM월 dd일", new Date())}
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-0.5 flex justify-center text-sm rounded-full bg-gray-150">
                {/* TODO 정렬 미구현 */}
                최신순
                <ImageFrame src={arrowIconPath} className="w-4 h-4 ml-1 " />
              </button>
            </div>
          </div>
          <PlanList />
        </div>
        <Link href="/plan/create">
          <CreatePlanButton />
        </Link>
      </div>
    </MainLayout>
  );
}
