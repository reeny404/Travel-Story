"use client";

import MainLayout from "@/components/Layout/MainLayout";
import SearchBar from "@/components/SearchBar/SearchBar";
import { ICON } from "@/constants/icon";
import { useAuth } from "@/contexts/auth.contexts";
import { SlideCardProps } from "@/types/Slider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MyTrip from "./MyTrip";

const CardMockUpData: SlideCardProps[] = [
  {
    title: "로마",
    description: "고대의 역사가 살아숨쉬는 도시",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
    tags: ["친구와 함께", "힐링", "식도락", "문화"],
    id: 100,
    city: "도시",
    country: "나라",
    areaName: "장소 이름",
  },
  {
    title: "파리",
    description: "낭만의 도시 파리에서의 하루",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
    tags: ["예술", "로맨스", "미식", "쇼핑"],
    id: 100001,
    city: "도시",
    country: "나라",
    areaName: "장소 이름",
  },
  {
    title: "뉴욕",
    description: "멈추지 않는 도시, 뉴욕의 활기찬 거리",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
    tags: ["야경", "엔터테인먼트", "패션", "다양성"],
    id: 100002,
    city: "도시",
    country: "나라",
    areaName: "장소 이름",
  },
  {
    title: "도쿄",
    description: "전통과 현대가 공존하는 도시, 도쿄",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
    tags: ["애니메이션", "전통", "기술", "쇼핑"],
    id: 100003,
    city: "도시",
    country: "나라",
    areaName: "장소 이름",
  },
];

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  console.log(user);
  const handleAvatarClick = () => {
    if (user) {
      return router.push("/my");
    }
    return router.push("/login");
  };
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "TravelStory",
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
            onClick: handleAvatarClick,
          },
        ],
      }}
    >
      <main
        className="relative w-full bg-gray"
        style={{ minHeight: "calc(100vh - 52px)" }}
      >
        <div className="relative w-full h-[222px] bg-slate-200">
          <Link href="/recommend/country/1/detail">
            <Image
              src="/banners/banner1_x3.png"
              alt="banner"
              fill
              className="object-cover"
            />
          </Link>
        </div>
        <div className="sticky z-10 -mt-[15px] px-4">
          <Link href="/search" className="flex justify-center w-full">
            <SearchBar />
          </Link>
        </div>
        <MyTrip />
      </main>
    </MainLayout>
  );
}

export default Home;
