import { PropsWithChildren } from "react";

function RecommendLayout({ children }: PropsWithChildren) {
  return <div className="w-full">{children}</div>;
}

export default RecommendLayout;
