import Header from "@/components/commons/Header";
import { PropsWithChildren } from "react";

function SearchLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header title="어디로 떠나시나요?" />
      {children}
    </>
  );
}

export default SearchLayout;
