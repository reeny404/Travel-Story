"use client";

import MainLayout from "@/components/Layout/MainLayout";
import SearchBar from "@/components/SearchBar/SearchBar";
import { ICON } from "@/constants/icon";
import Image from "next/image";
import Link from "next/link";
import MyTrip from "./MyTrip";

function Home() {
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
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
            path: "/my",
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
