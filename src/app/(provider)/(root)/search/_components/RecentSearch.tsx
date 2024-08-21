import SvgIcon from "@/components/commons/SvgIcon";
import { useAuth } from "@/contexts/auth.contexts";
import { useRecentStore } from "@/stores/recent.store";
import { createClient } from "@/supabase/client";
import { RecnetSearch } from "@/types/recent";
import { useEffect, useState } from "react";

function RecentSearch() {
  const supabase = createClient();
  const { user, isInitialized, isLoggedIn } = useAuth();
  const { setRecentSearch } = useRecentStore();
  const [recent, setRecent] = useState<RecnetSearch[]>();

  useEffect(() => {
    async function getRecentSearch() {
      if (isInitialized && user) {
        const { data, error } = await supabase
          .from("recents")
          .select("search")
          .eq("user_id", user.id)
          .single<RecnetSearch[]>();

        if (error) {
          console.error(error);
          return;
        }
        if (data) {
          setRecentSearch(data);
          setRecent(data);
        }
      }
    }

    getRecentSearch();
  }, []);

  const handleClickCancel = async (index: number) => {
    const deleteRecent = recent?.filter((_, idx) => {
      return index !== idx;
    });
    setRecent(deleteRecent);
    setRecentSearch(deleteRecent || []);
    // update 안에 무엇이 들어가야하는건지, 의도를 알 수 없어 주석처리했습니다
    // await supabase.from("recents").upsert(
    //   [
    //     {
    //       user_id: user?.id,
    //       search: deleteRecent,
    //     },
    //   ],
    //   {
    //     onConflict: "id",
    //   }
    // );
  };

  return (
    <div className="w-full px-4">
      <div className="font-semibold py-[10px]">최근 검색어</div>
      {recent?.map((item, index) => {
        return (
          <div key={index} className="flex items-center py-[10px]">
            <p>{item.search}</p>
            <div className="flex-grow" />
            <p className="text-neutral-350">{item.date}</p>
            <button className="px-3" onClick={() => handleClickCancel(index)}>
              <SvgIcon name="x" width={15} color="neutral-450" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default RecentSearch;
