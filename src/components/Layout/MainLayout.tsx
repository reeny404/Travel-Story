import Header from "@/components/commons/Header";
import { HeaderProps } from "@/components/commons/Header/Header";
import ClientDrawer from "../Drawer/ClientDrawer";

type MainLayoutProps = {
  children: React.ReactNode;
  headerProps?: HeaderProps;
};

function MainLayout({ children, headerProps }: MainLayoutProps) {
  return (
    <>
      {headerProps && <Header {...headerProps} />}
      <ClientDrawer />
      {children}
    </>
  );
}

export default MainLayout;
