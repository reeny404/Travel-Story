import { ICON } from "@/constants/icon";
import useDrawerStore from "@/stores/drawer.store";
import Image from "next/image";
import { useEffect } from "react";
import BackDrop from "./BackDrop";
import CategoryList from "./CategoryList";
import DrawerMyProfile from "./DrawerMyProfile";

function Drawer() {
  const { isOpen, closeDrawer } = useDrawerStore();

  // 뒷배경 스크롤 방지 기능
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <BackDrop />}
      <aside
        className={`fixed top-0 max-w-[391px] w-full h-full pt-4 bg-neutral-400/84 shadow-drawer transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} duration-1000 z-drawer backdrop-blur-[14px] rounded-r-lg`}
        style={{ width: "calc(100% - 39px)" }}
      >
        <div className="flex justify-end items-center px-4 pt-4 rounded-tr-lg">
          <button onClick={closeDrawer}>
            <Image
              src={`/icons/${ICON.cancel.black}.png`}
              alt="cancel"
              width={16}
              height={16}
              priority
            />
          </button>
        </div>
        <DrawerMyProfile />
        <hr className="w-[88%] h-[0.6px] mx-auto bg-neutral-400 border-0 my-4" />
        <CategoryList />
      </aside>
    </>
  );
}

export default Drawer;
