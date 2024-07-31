"use client";

import { getIconPath } from "@/components/commons/Icon/getIconPath";
import ImageFrame from "@/components/Frame/ImageFrame";
import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import useDrawerStore from "@/stores/drawer.store";

export default function MyBookmarkPage() {
  const { openDrawer } = useDrawerStore();

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        leftIcons: [
          {
            icon: ICON.menu.burgerBlack,
            alt: "open drawer",
            size: 20,
            onClick: openDrawer,
          },
        ],
        title: "북마크",
        titleAlign: "center",
        rightIcons: [
          {
            icon: ICON.search.black,
            alt: "Search",
            size: 20,
            path: "/",
          },
        ],
      }}
    >
      <div className="w-full min-h-[calc(100dvh-52px)] mx-auto pb-4 bg-[#F8F8F8]">
        <div className="flex justify-around p-4">
          {/* TODO 여기 슬라이드 영역인가? 아니면 4개 고정인가? select 한거 저장할 수 있게 하자 */}
          <button>관광</button>
          <button>숙소</button>
          <button>식당</button>
          <button>쇼핑</button>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex rounded mx-4 bg-white">
              <div className="w-1/3">
                <ImageFrame src={null} className="w-full h-full bg-slate-200" />
              </div>
              <div className="w-2/3 px-2 py-4">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="font-bold">La Casetta a Monti</h2>
                  <ImageFrame
                    src={getIconPath(ICON.bookmark.off)}
                    className="w-5 h-5"
                  />
                </div>
                <p className="py-2 text-sm">장소 content 미리보기 영역</p>
                <div className="flex items-center">
                  <ImageFrame
                    src={getIconPath(ICON.maker.gray)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">콜로세움 근처, 로마</span>
                </div>
                <div className="flex justify-end text-sm">
                  <button className="h-8 flex justify-center items-center px-3 mt-4 rounded-full bg-blue-500 text-white">
                    <ImageFrame
                      src={getIconPath(ICON.calendar.white)}
                      className="w-4 h-4 mr-2"
                    />
                    내 여행에 추가
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
