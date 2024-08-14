"use client";
import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

function FooterList() {
  const lineStyle = "mb-2 px-4 py-3 text-lg cursor-pointer";
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogoutClick = async (
    e: MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const result = await api.auth.logout();
    setUser(null);
    router.replace("/");
  };

  return (
    <section className="w-full mt-3 px-4 z-10">
      <p className={lineStyle}>고객센터</p>
      <p className={lineStyle}>이용약관</p>
      <p className={lineStyle}>개인정보처리방침</p>
      <p className={lineStyle} onClick={(e) => handleLogoutClick(e)}>
        로그아웃
      </p>
    </section>
  );
}

export default FooterList;
