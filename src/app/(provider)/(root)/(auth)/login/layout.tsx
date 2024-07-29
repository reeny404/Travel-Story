import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-full">
        <header className="h-[52px] text-center bg-white">로그인</header>
        {children}
      </div>
    </div>
  );
}

export default layout;
