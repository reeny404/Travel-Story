"use client";

import { AuthProvider } from "@/contexts/auth.contexts";
import QueryProvider from "@/providers/query.provider";
import { usePathStore } from "@/stores/path.store";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  const path = usePathname();
  const { setPrevPath } = usePathStore();

  useEffect(() => storePathValues, [path]);

  const storePathValues = () => {
    setPrevPath(path);
  };

  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}

export default ProviderLayout;
