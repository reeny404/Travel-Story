"use client";
import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FooterList from "./FooterList";
import MyMenu from "./MyMenu";
import MyProfile from "./MyProfile";
import MySchedule from "./MySchedule";

type SupabaseUser = {
  image_url: string;
  nickname: string;
};

function MyPageSection() {
  const { user, isInitialized, isLoggedIn } = useAuth();
  const router = useRouter();

  const { data: supabaseUser, isPending } = useQuery<SupabaseUser>({
    queryKey: ["users"],
    queryFn: async () => await api.auth.userProfile(user?.email as string),
  });

  if (isInitialized && !isLoggedIn) {
    router.replace("/login");
    return;
  }

  if (!supabaseUser) {
    router.replace("/login");
    return;
  }

  if (isPending) {
    return (
      <section className="flex flex-col w-full items-center mt-[21px] mb-[29px]">
        <Image
          src={"/icons/avatar.svg"}
          alt="프로필"
          width={88}
          height={88}
          className="rounded-full"
        />
        <div className="w-[100px] h-[24px] mt-4 bg-gray-300 rounded-lg"></div>
      </section>
    );
  }

  return (
    <main className="relative aspect-square flex flex-col w-full h-screen px-5 pt-12 overflow-hidden">
      <div className="absolute w-full h-full top-0 left-0 bg-neutral-100 z-10 opacity-50" />
      <Image
        src={supabaseUser.image_url}
        alt="background"
        layout="fill"
        objectFit="cover"
        className="z-0 blur-md"
      />
      <MyProfile
        image_url={supabaseUser.image_url}
        nickname={supabaseUser.nickname}
      />
      <MySchedule />
      <MyMenu />
      <section className="w-full p-[10px] mt-10 text-white bg-neutral-650 rounded-lg z-10">
        [공지] 공지사항
      </section>
      <FooterList />
    </main>
  );
}

export default MyPageSection;
