"use client";

import { api } from "@/apis/api";
import SlideTagList from "@/components/commons/TagList/SlideTagList";
import MainLayout from "@/components/Layout/MainLayout";
import { Schedule } from "@/types/plan";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import BookmarkCard from "./_components/BookmarkCard";

const HEADER_TAGS = ["관광", "숙소", "식사", "쇼핑"];
const userId = "80bf108c-63c1-43ce-b463-92b9a0915f0d";

type PageProps = {
  searchParams: { planId: string; day: string };
};

export default function MyBookmarkPage({
  searchParams: { planId, day },
}: PageProps) {
  const dayIndex: number = Number(day);
  const router = useRouter();
  const onTagClick = (tag: string) => {};

  const { data: bookmarks, isPending } = useQuery({
    queryKey: ["bookmark"],
    queryFn: () => api.bookmark.getBookmarks(userId),
    select: (data) => data.data,
  });

  const { mutateAsync: addAreaToPlan } = useMutation({
    mutationFn: (data: Schedule) =>
      api.plan.addChild(planId, dayIndex, "customePlace", data),
    onSuccess: () => {
      router.push(`/plan/${planId}`);
    },
  });

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "북마크",
        titleAlign: "center",
        // rightIcons: [
        //   {
        //     icon: ICON.search.black,
        //     alt: "Search",
        //     size: 20,
        //     path: "/",
        //   },
        // ],
      }}
    >
      <div className="w-full min-h-[calc(100dvh-52px)] mx-auto pb-4 bg-[#F8F8F8]">
        <section className="p-4">
          <SlideTagList
            tagList={HEADER_TAGS}
            onTagClick={onTagClick}
            spacing={10}
          />
        </section>
        <div className="space-y-4">
          {isPending && <p className="py-6 text-center">로딩 중입니다.</p>}
          {bookmarks &&
            bookmarks.length !== 0 &&
            bookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                area={bookmark.area}
                bookmark={bookmark}
                onClickAddToPlan={addAreaToPlan}
              />
            ))}
        </div>
      </div>
    </MainLayout>
  );
}
