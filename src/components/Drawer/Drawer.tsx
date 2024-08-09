"use client";

import { ICON } from "@/constants/icon";
import useDrawerStore from "@/stores/drawer.store";
import Image from "next/image";
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
      drawerRef.current.style.transition = "none"; // 터치 시작 시 애니메이션 제거
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const touchX = e.touches[0].clientX;
    console.log(touchX);

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
        ref={drawerRef}
        className={`fixed top-0 left-0 max-w-[391px] w-full h-full pt-4 bg-neutral-400/84 shadow-drawer z-drawer backdrop-blur-[14px] rounded-r-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: "calc(100% - 39px)",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
