import { PropsWithChildren } from "react";

function RecommendLayout({ children }: PropsWithChildren) {
  return <div className="w-[375px]">{children}</div>;
}

export default RecommendLayout;
