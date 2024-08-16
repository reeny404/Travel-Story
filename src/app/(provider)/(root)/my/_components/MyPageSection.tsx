"use client";
import { useAuth } from "@/contexts/auth.contexts";
import { createClient } from "@/supabase/client";
import { Database } from "@/types/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RecentArea from "../../search/_components/RecentArea";
import FooterList from "./FooterList";
import MyMenu from "./MyMenu";
import MyProfile from "./MyProfile";
import MySchedule from "./MySchedule";

type SupabaseUser = Database["public"]["Tables"]["users"]["Row"];

function MyPageSection() {
  const { user, isInitialized, isLoggedIn } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser>();

  useEffect(() => {
    const getUserTable = async () => {
      if (isInitialized && user) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error(error);
        }
        if (data) {
          setSupabaseUser(data);
        }
      }
    };

    getUserTable();
  }, [isInitialized, user]);

  if (isInitialized && !isLoggedIn) {
    router.replace("/login");
    return;
  }

  if ((!isInitialized && !user) || !supabaseUser) {
    return <p>loading...</p>;
  }
  return (
    <main className="relative aspect-square flex flex-col w-full h-screen px-5 pt-12 overflow-hidden">
      <div className="absolute w-full h-full top-0 left-0 bg-neutral-100 z-10 opacity-50" />
      <Image
        src={supabaseUser.image_url || "/icons/avatar.svg"}
        alt="background"
        fill
        className="z-0 blur-sm object-cover"
      />
      <MyProfile
        user={{
          id: supabaseUser.id,
          email: supabaseUser.email,
          nickname: supabaseUser.nickname,
          image_url: supabaseUser.image_url,
        }}
      />
      <MySchedule />
      <MyMenu />
      <section className="w-full p-[10px] mt-10 mb-8 text-white bg-neutral-650 rounded-lg z-10">
        [공지] 공지사항
      </section>
      <RecentArea />
      <FooterList />
    </main>
  );
}

export default MyPageSection;
