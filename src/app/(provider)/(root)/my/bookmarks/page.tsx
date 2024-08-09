import MainLayout from "@/components/Layout/MainLayout";
import { Tab, TABS } from "@/constants/tabs";
import MyBookmarkList from "./_components/MyBookmarkList";

export type MyBookmarkPageParams = {
  planId: string;
  day: string;
};

type PageProps = {
  searchParams: MyBookmarkPageParams;
};

export default function MyBookmarkPage({ searchParams }: PageProps) {
  const tabs: Tab[] = TABS.default;
  console.log("searchParams", searchParams);

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
      <div className="w-full min-h-[calc(100dvh-52px)] pb-4">
        <MyBookmarkList tabs={tabs} params={searchParams} />
      </div>
    </MainLayout>
  );
}
