import { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col w-full h-full">{children}</div>;
}

export default AuthLayout;
