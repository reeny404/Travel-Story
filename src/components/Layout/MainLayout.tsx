import Header from "@/components/commons/Header";
import { HeaderProps } from "@/components/commons/Header/Header";
import ClientDrawer from "../Drawer/ClientDrawer";

type MainLayoutProps = {
  children: React.ReactNode;
  headerProps?: HeaderProps;
};

function MainLayout({ children, headerProps }: MainLayoutProps) {
  return (
    <div>
      {headerProps && <Header {...headerProps} />}
      <ClientDrawer />
      {children}
    </div>
  );
}

export default MainLayout;
