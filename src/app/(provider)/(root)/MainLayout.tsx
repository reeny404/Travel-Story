import Header from "@/components/commons/Header";
import { HeaderProps } from "@/components/commons/Header/Header";
import Drawer from "@/components/Drawer/Drawer";
import useDrawerStore from "@/stores/useDrawerStore";

type MainLayoutProps = {
  children: React.ReactNode;
  headerProps?: HeaderProps;
};

function MainLayout({ children, headerProps }: MainLayoutProps) {
  const { isOpen } = useDrawerStore();

  return (
    <>
      {headerProps && <Header {...headerProps} />}
      {isOpen && <Drawer />}
      {children}
    </>
  );
}

export default MainLayout;
