import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return <div className="flex flex-col w-[375px] h-full">{children}</div>;
}

export default layout;
