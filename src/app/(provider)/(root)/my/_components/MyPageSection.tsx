"use client";
import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FooterList from "./FooterList";
import MyMenu from "./MyMenu";
import MyProfile from "./MyProfile";
import MySchedule from "./MySchedule";

type SupabaseUser = {
  id: string;
  email: string;
  image_url: string;
  nickname: string;
};

function MyPageSection() {
  const { user, isInitialized, isLoggedIn } = useAuth();
  const router = useRouter();
  const { user: users, putImage } = useAuthStore();

  const {
    data: supabaseUser,
    isPending,
    isSuccess,
  } = useQuery<SupabaseUser>({
    queryKey: ["users"],
    queryFn: async () => await api.auth.userProfile(user?.email as string),
  });

  if (isSuccess) {
    putImage(supabaseUser.image_url);
  }

  if ((isInitialized && !isLoggedIn) || !supabaseUser) {
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
        <div className="w-[100px] h-[24px] mt-4 bg-gray-300 rounded-lg" />
      </section>
    );
  }

  console.log(users.image_url);
  return (
    <main className="relative aspect-square flex flex-col w-full h-screen px-5 pt-12 overflow-hidden">
      {/* <Image
        src={`${users.image_url}`}
        alt="background"
        layout="fill"
        objectFit="cover"
        className="z-0 blur-sm"
      /> */}
      <MyProfile user={supabaseUser} />
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
