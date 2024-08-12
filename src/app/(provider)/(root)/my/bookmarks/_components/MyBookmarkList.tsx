"use client";

import { api } from "@/apis/api";
import Tab from "@/components/Tab/Tab";
import { TABS, TabType } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import { extendBookmark } from "@/types/Recommend";
import { useEffect, useState } from "react";
import { MyBookmarkPageParams } from "../page";
import BookmarkCard from "./BookmarkCard";
import SuggestArea from "./SuggestArea";

type PageProps = {
  params: MyBookmarkPageParams;
  tabs: TabType[];
};

export default function MyBookmarkList({ tabs, params }: PageProps) {
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.default });
  const [bookmarks, setBookmarks] = useState<extendBookmark[]>([]);
  useEffect(() => {
    api.bookmark.getBookmarks().then(({ data }) => {
      setBookmarks(data);
    });
  }, []);

  const list: extendBookmark[] = bookmarks?.length
    ? bookmarks.filter((bookmark) => currentTab === bookmark.area.type)
    : [];

  return (
    <>
      <section className="py-1 px-4">
        <Tab
          TABS={TABS.default}
          currentTab={currentTab!}
          setCurrentTab={setCurrentTab}
          isGray={true}
        />
      </section>
      <section className="space-y-4">
        {!list.length && <SuggestArea />}
        {list.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} params={params} />
        ))}
      </section>
    </>
  );
}
