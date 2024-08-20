import Header from "@/components/commons/Header";
import { HeaderProps } from "@/components/commons/Header/Header";
import ClientDrawer from "../Drawer/ClientDrawer";
import Footer from "../commons/Footer/Footer";
import LgHeader from "../commons/Header/LgHeader";

type MainLayoutProps = {
  children: React.ReactNode;
  headerProps?: HeaderProps;
};

function MainLayout({ children, headerProps }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {headerProps && (
        <>
          <Header {...headerProps} />
          <LgHeader />
        </>
      )}
      <ClientDrawer />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
