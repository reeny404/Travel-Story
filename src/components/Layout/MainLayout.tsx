import Header from "@/components/commons/Header";
import { HeaderProps } from "@/components/commons/Header/Header";
import ClientDrawer from "../Drawer/ClientDrawer";
import LgHeader from "../commons/Header/LgHeader";

type MainLayoutProps = {
  children: React.ReactNode;
  headerProps?: HeaderProps;
};

function MainLayout({ children, headerProps }: MainLayoutProps) {
  return (
    <>
      {headerProps && (
        <>
          <Header {...headerProps} />
          <LgHeader />
        </>
      )}
      <ClientDrawer />
      {children}
    </>
  );
}

export default MainLayout;
