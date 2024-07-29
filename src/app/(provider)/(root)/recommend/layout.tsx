import { PropsWithChildren } from "react";

function RecommendLayout({ children }: PropsWithChildren) {
  return <div className="w-screen h-screen">{children}</div>;
}

export default RecommendLayout;
