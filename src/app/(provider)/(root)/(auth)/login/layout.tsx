import Header from "@/components/commons/Header";
import { ICON } from "@/constants/Icon";
import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-full">
        <Header
          title="로그인"
          leftIcons={[
            {
              icon: ICON.arrow.back.black,
              alt: "back",
              size: 20,
              path: "/",
            },
          ]}
        />
        {children}
      </div>
    </div>
  );
}

export default layout;
