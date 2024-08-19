import Header from "@/components/commons/Header";
import { HeaderProps } from "@/components/commons/Header/Header";
import ClientDrawer from "../Drawer/ClientDrawer";
import LgHeader from "../commons/Header/LgHeader";

type MainLayoutProps = {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  noHeader?: boolean;
};

function MainLayout({ children, headerProps, noHeader }: MainLayoutProps) {
  return (
    <>
      {headerProps && (
        <>
          <Header {...headerProps} />
          {!noHeader && <LgHeader />}
        </>
      )}
      <ClientDrawer />
      {children}
    </>
  );
}

export default MainLayout;
