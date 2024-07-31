import Header from "@/components/commons/Header";
import { ICON } from "@/constants/icon";
import { PropsWithChildren } from "react";

function SearchLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header
        title="어디로 떠나시나요?"
        leftIcons={[
          {
            icon: ICON.arrow.back.black,
            alt: "back",
            size: 20,
            path: "back",
          },
        ]}
      />
      {children}
    </>
  );
}

export default SearchLayout;
