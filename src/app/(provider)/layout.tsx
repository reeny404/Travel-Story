"use client";

import { AuthProvider } from "@/contexts/auth.contexts";
import { OverlayProvider } from "@/contexts/overlay.context";
import QueryProvider from "@/providers/query.provider";
import { useRecentStore } from "@/stores/recent.store";
import { createClient } from "@/supabase/client";
import { PropsWithChildren, useEffect } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  const { setRecentArea } = useRecentStore();
  const supabase = createClient();

  useEffect(() => {
    const getRecentArea = async () => {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;

      if (userId) {
        const { data, error } = await supabase
          .from("recents")
          .select("area")
          .eq("id", userId);
        if (error) {
          console.error(error);
        }
        const recentList = data?.[0]?.area ?? [];
        setRecentArea(recentList);
      }
    };
    getRecentArea();
  }, []);

  return (
    <QueryProvider>
      <AuthProvider>
        <OverlayProvider>{children}</OverlayProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

export default ProviderLayout;
