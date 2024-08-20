"use client";
import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

function FooterList() {
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
    <section className="w-full mt-3 z-10">
      <p
        className="mb-2 px-4 py-3 text-lg cursor-pointer bg-white bg-opacity-40 md:bg-opacity-65 rounded-lg mt-4 text-center hover:bg-danger-300 hover:text-white"
        onClick={(e) => handleLogoutClick(e)}
      >
        로그아웃
      </p>
    </section>
  );
}

export default FooterList;
