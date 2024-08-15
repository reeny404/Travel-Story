"use client";

import { AuthProvider } from "@/contexts/auth.contexts";
import QueryProvider from "@/providers/query.provider";
import { useRecentStore } from "@/stores/recent.store";
import { createClient } from "@/supabase/client";
import { PropsWithChildren, useEffect } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const { setRecentArea } = useRecentStore();

  useEffect(() => {
    const getRecentArea = async () => {
      const user = (await supabase.auth.getUser()).data.user;
      if (user) {
        const { data, error } = await supabase
          .from("recents")
          .select("area")
          .eq("id", user.id);
        if (error) {
          console.error(error);
        }
        console.log(data);
        if (data && data[0].area) {
          console.log(data[0].area);
          setRecentArea(data[0].area);
        }
      }
    };
    getRecentArea();
  }, []);

  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}

export default ProviderLayout;
