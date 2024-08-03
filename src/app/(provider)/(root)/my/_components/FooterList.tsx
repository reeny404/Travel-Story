"use client";
import { api } from "@/apis/api";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

function FooterList() {
  const lineStyle = "mb-3 cursor-pointer";
  const router = useRouter();

  const handleLogoutClick = async (
    e: MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const result = await api.auth.logout();
    console.log(result);
    router.push("/");
  };

  return (
    <section className="w-full mt-[30px]">
      <p className={lineStyle}>고객센터</p>
      <p className={lineStyle}>이용약관</p>
      <p className={lineStyle}>개인정보처리방침</p>
      <p className={lineStyle}>사용 가이드</p>
      <p className={lineStyle} onClick={(e) => handleLogoutClick(e)}>
        로그아웃
      </p>
    </section>
  );
}

export default FooterList;
