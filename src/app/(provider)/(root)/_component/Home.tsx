"use client";

import CardType from "@/components/Card/CardType";
import MainLayout from "@/components/Layout/MainLayout";
import SearchBar from "@/components/SearchBar/SearchBar";
import CardSlider from "@/components/Slider/CardSlider";
import { ICON } from "@/constants/Icon";
import useDrawerStore from "@/stores/drawer.store";
import { SlideCardProps } from "@/types/Slider";
import Link from "next/link";

const CardMockUpData: SlideCardProps[] = [
  {
    title: "로마",
    description: "고대의 역사가 살아숨쉬는 도시",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
  },
  {
    title: "파리",
    description: "낭만의 도시 파리에서의 하루",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
  },
  {
    title: "뉴욕",
    description: "멈추지 않는 도시, 뉴욕의 활기찬 거리",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
  },
  {
    title: "도쿄",
    description: "전통과 현대가 공존하는 도시, 도쿄",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
  },
];

function Home() {
  const { openDrawer } = useDrawerStore();

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        leftIcons: [
          {
            icon: ICON.menu.burgerBlack,
            alt: "Back",
            size: 20,
            onClick: openDrawer,
          },
        ],
        title: "TripStory",
        titleAlign: "left" as const,
        rightIcons: [
          {
            icon: ICON.notification.black,
            alt: "Notifications",
            size: 20,
            path: "/commons-test",
          },
          {
            icon: ICON.avatar.black,
            alt: "Avatar",
            size: 20,
            path: "/login",
          },
        ],
      }}
    >
      <main className="w-full h-[770px] bg-[#F8F8F8]">
        <section className="w-full h-[222px] bg-black mb-10" />
        <Link
          href="/search"
          className="fixed top-[253px] left-1/2 trasform -translate-x-1/2"
        >
          <SearchBar />
        </Link>
        <div className="w-full pl-[18px]">
          <CardType title="문화 탐방" type="architect" />
          <CardSlider spacing={20} slidesPerView={1.2} cards={CardMockUpData} />
        </div>
      </main>
    </MainLayout>
  );
}

export default Home;
