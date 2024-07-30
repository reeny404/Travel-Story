import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-full">{children}</div>
    </div>
  );
}

export default layout;
