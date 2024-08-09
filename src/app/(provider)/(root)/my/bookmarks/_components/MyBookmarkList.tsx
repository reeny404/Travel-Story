"use client";

import { api } from "@/apis/api";
import SlideTagList from "@/components/commons/TagList/SlideTagList";
import { Tab } from "@/constants/tabs";
import { BookmarkWithArea } from "@/types/Recommend";
import { useCallback, useEffect, useState } from "react";
import { MyBookmarkPageParams } from "../page";
import BookmarkCard from "./BookmarkCard";

type PageProps = {
  params: MyBookmarkPageParams;
  tabs: Tab[];
};

export default function MyBookmarkList({ tabs, params }: PageProps) {
  const [filterTag, setFilterTag] = useState<Tab>(tabs[0]);
  const [bookmarks, setBookmarks] = useState<BookmarkWithArea[]>([]);
  useEffect(() => {
    api.bookmark.getBookmarks().then(({ data }) => {
      setBookmarks(data);
    });
  }, []);

  const onTagClick = useCallback((tag: string) => {
    const clickedTab: Tab = tabs.find((tab) => tab.kr === tag) ?? tabs[0];
    setFilterTag(clickedTab);
    // tabs는 절대 바뀔 일이 없다는 전제하에 작성됨
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("bookmarks", bookmarks);
  const list: BookmarkWithArea[] = bookmarks?.length
    ? bookmarks.filter((bookmark) => filterTag.en === bookmark.area.type)
    : [];

  return (
    <>
      <section className="p-4">
        <SlideTagList
          tagList={tabs.map((tab) => tab.kr)}
          onTagClick={onTagClick}
          spacing={10}
        />
      </section>
      <section className="space-y-4">
        {list.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} params={params} />
        ))}
      </section>
    </>
  );
}
