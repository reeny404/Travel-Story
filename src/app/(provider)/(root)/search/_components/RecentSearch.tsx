"use client";
import SvgIcon from "@/components/commons/SvgIcon";
import { useAuth } from "@/contexts/auth.contexts";
import { createClient } from "@/supabase/client";
import { useEffect } from "react";

function RecentSearch() {
  const supabase = createClient();
  const { user, isInitialized, isLoggedIn } = useAuth();

  useEffect(() => {
    async function getRecentSearch() {
      if (isInitialized && user) {
        // const { data, error } = await supabase
        //   .from("recent")
        //   .select("search")
        //   .eq("user_id", user.id);
      }
    }
  }, []);

  if (isInitialized && isLoggedIn)
    return (
      <div className="w-full px-4 space-y-4">
        <div className="font-semibold">최근 검색어</div>
        <div className="flex items-center">
          <p>로마 도서관</p>
          <div className="flex-grow"></div>
          <p className="text-neutral-350">2024.05.18</p>
          <button className="px-3">
            <SvgIcon name="x" width={15} color="neutral-450" />
          </button>
        </div>
      </div>
    );
}

export default RecentSearch;
