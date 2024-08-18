"use client";
import SvgIcon from "@/components/commons/SvgIcon";
import { useAuth } from "@/contexts/auth.contexts";
import { useRecentStore } from "@/stores/recent.store";
import { createClient } from "@/supabase/client";
import { useEffect, useState } from "react";

type RecentSearchProps = {
  onSearch?: (term: string) => void;
};

function RecentSearch({ onSearch }: RecentSearchProps) {
  const supabase = createClient();
  const { user, isInitialized, isLoggedIn } = useAuth();
  const { setRecentSearch } = useRecentStore();
  const [recent, setRecent] =
    useState<Array<{ search: string; date: string }>>();

  useEffect(() => {
    async function getRecentSearch() {
      if (isInitialized && user) {
        const { data, error } = await supabase
          .from("recents")
          .select("search")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error(error);
          return;
        }
        if (data) {
          setRecentSearch(data.search);
          setRecent(data.search);
        }
      }
    }

    getRecentSearch();
  }, []);

  const handleRecentSearch = (term: string) => {
    if (onSearch) {
      onSearch(term);
    }
  };

  const handleClickCancel = async (index: number) => {
    const deleteRecent = recent?.filter((_, idx) => {
      return index !== idx;
    });
    setRecent(deleteRecent);
    setRecentSearch(deleteRecent || []);
    await supabase.from("recents").upsert(
      [
        {
          user_id: user?.id,
          search: deleteRecent,
        },
      ],
      {
        onConflict: "id",
      }
    );
  };

  return (
    <div className="w-full px-4">
      <div className="font-medium py-[10px] md:text-lg lg:text-xl">
        최근 검색어
      </div>
      {recent && recent.length > 0 ? (
        recent.map((recentTerm, index) => (
          <div key={index} className="flex items-center py-[10px] ">
            <p
              className="cursor-pointer"
              onClick={() => handleRecentSearch(recentTerm.search)}
            >
              {recentTerm.search}
            </p>
            <div className="flex-grow" />
            <p className="text-neutral-350">{recentTerm.date}</p>
            <button className="px-3" onClick={() => handleClickCancel(index)}>
              <SvgIcon name="x" width={15} color="neutral-450" />
            </button>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center py-10">
          <p className="text-neutral-500">최근 검색어가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default RecentSearch;
