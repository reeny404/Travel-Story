import Header from "@/components/commons/Header";
import { HeaderProps } from "@/components/commons/Header/Header";
import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
  headerProps: HeaderProps;
};

function MainLayout({ children, headerProps }: MainLayoutProps) {
  return (
    <>
      {headerProps && <Header {...headerProps} />}
      {children}
    </>
  );
}

export default MainLayout;
