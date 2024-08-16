"use client";

import { AuthProvider } from "@/contexts/auth.contexts";
import { OverlayProvider } from "@/contexts/overlay.context";
import QueryProvider from "@/providers/query.provider";
import { usePathStore } from "@/stores/path.store";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  const path = usePathname();
  const { setPrevPath } = usePathStore();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => storePathValues, [path]);

  const storePathValues = () => {
    setPrevPath(path);
  };

  return (
    <QueryProvider>
      <AuthProvider>
        <OverlayProvider>{children}</OverlayProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

export default ProviderLayout;
