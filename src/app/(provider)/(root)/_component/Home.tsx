"use client";

import SearchBar from "@/components/SearchBar/SearchBar";
import { ICON } from "@/constants/Icon";
import useDrawerStore from "@/stores/drawer.store";
import Link from "next/link";
import MainLayout from "../../../../components/Layout/MainLayout";

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
      <main className="w-full h-full">
        <section className="w-full h-[222px] bg-black" />
        <Link
          href="/search"
          className="fixed top-[253px] left-1/2 trasform -translate-x-1/2"
        >
          <SearchBar />
        </Link>
      </main>
    </MainLayout>
  );
}

export default Home;
