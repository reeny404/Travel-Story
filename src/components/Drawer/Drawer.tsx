"use client";

import useDrawerStore from "@/stores/drawer.store";
import { useEffect, useRef } from "react";
import BackDrop from "./BackDrop";
import CategoryList from "./CategoryList";
import DrawerMyProfile from "./DrawerMyProfile";

function Drawer() {
  const { isOpen, closeDrawer } = useDrawerStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const currentXRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = 0;
    if (drawerRef.current) {
      drawerRef.current!.style.transition = "none";
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const touchX = e.touches[0].clientX;

    const diff = (startXRef.current - touchX) * 0.4;
    if (diff > 0) {
      currentXRef.current = -diff;
      if (drawerRef.current) {
        drawerRef.current.style.transform = `translateX(${currentXRef.current}px)`;
      }
    }
  };

  const handleTouchEnd = () => {
    // 60px 이상 왼쪽으로 스와이프하면 닫기
    if (currentXRef.current < -60) {
      if (drawerRef.current) {
        drawerRef.current.style.transition = "transform 0.5s ease-out";
        drawerRef.current.style.transform = "translateX(-100%)";
      }
      setTimeout(() => closeDrawer(), 500);
    } else {
      if (drawerRef.current) {
        drawerRef.current.style.transition = "transform 0.5s ease-out"; // 원래 위치로 돌아가는 기능
        drawerRef.current.style.transform = "translateX(0px)";
      }
    }
    startXRef.current = null;
    currentXRef.current = 0;
  };

  // 부드럽게 drawer 닫기
  const handleCloseWithSlide = () => {
    if (drawerRef.current) {
      drawerRef.current.style.transition = "transform 0.5s ease-out";
      drawerRef.current.style.transform = "translateX(-100%)";
    }
    setTimeout(() => closeDrawer(), 500);
  };

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
      {isOpen && <BackDrop onClose={handleCloseWithSlide} />}
      <aside
        ref={drawerRef}
        className={`fixed top-0 max-w-[391px] w-full h-full pt-4 bg-neutral-400/84 shadow-drawer z-drawer backdrop-blur-[14px] rounded-r-lg transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: "calc(100% - 39px)",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <DrawerMyProfile />
        <hr className="w-[88%] h-[0.6px] mx-auto bg-neutral-400 border-0 my-4" />
        <div
          className="overflow-y-auto no-scrollbar"
          style={{ maxHeight: "calc(100vh - 8rem)" }}
        >
          <CategoryList />
        </div>
      </aside>
    </>
  );
}

export default Drawer;
