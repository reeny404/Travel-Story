import { getIconPath } from "@/components/commons/Icon/getIconPath";
import ImageFrame from "@/components/Frame/ImageFrame";
import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import { DateUtil } from "@/utils/DateUtil";
import Link from "next/link";
import { useMemo } from "react";
import PlanList from "./_components/PlanList";
import PlusIcon from "./_components/PlusIcon";

export default function PlanListPage() {
  const arrowIconPath = useMemo(() => getIconPath(ICON.arrow.down.black), []);
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        leftIcons: [
          {
            icon: ICON.arrow.back.black,
            alt: "Back",
            path: "/",
            size: 20,
          },
        ],
        title: "내 여행",
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
      <div className="min-h-[calc(100dvh-52px)] bg-gray-100">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">
              {DateUtil.format("yyyy년 MM월 dd일", new Date())}
            </span>
            <div className="flex items-center space-x-2">
              {/* TODO 필터 미구현 */}
              <button className="text-sm">필터</button>
              <button className="text-sm flex justify-center">
                {/* TODO 정렬 미구현 */}
                최신순
                <ImageFrame src={arrowIconPath} className="w-4 h-4" />
              </button>
            </div>
          </div>
          <PlanList />
        </div>
        <Link
          href="/plan/create" // TODO 클릭 링크 현재는 flow 미정이라, url 점검 필요
          className="w-12 h-12 fixed bottom-8 right-8 bg-blue-500 rounded-full hover:brightness-110"
        >
          <div className="w-full h-full flex justify-center items-center">
            <PlusIcon className="text-white" />
          </div>
        </Link>
      </div>
    </MainLayout>
  );
}
