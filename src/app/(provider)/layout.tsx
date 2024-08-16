"use client";

import { AuthProvider } from "@/contexts/auth.contexts";
import { OverlayProvider } from "@/contexts/overlay.context";
import QueryProvider from "@/providers/query.provider";
import { PropsWithChildren } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <AuthProvider>
        <OverlayProvider>{children}</OverlayProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

export default ProviderLayout;
