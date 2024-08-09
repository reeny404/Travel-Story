"use client";

import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import useDrawerStore from "@/stores/drawer.store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

type SupabaseUser = {
  image_url: string;
  nickname: string;
};

function DrawerMyProfile() {
  const { user } = useAuth();
  const { closeDrawer } = useDrawerStore();
  const { data: myProfile } = useQuery<SupabaseUser>({
    queryKey: ["users"],
    queryFn: () => api.auth.userProfile(user?.email as string),
  });

  const profileImage = myProfile?.image_url;
  const nickname = myProfile?.nickname;

  return (
    <div className="flex flex-row items-center px-6">
      {profileImage ? (
        <div className="w-10 h-10 rounded-full bg-neutral-200">
          <Image
            src={profileImage}
            alt="profile Image"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <Image
          src="/travelstory-logo.png"
          alt="profile Image"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      {user ? (
        <h4 className="ml-3 text-xl font-semibold" onClick={closeDrawer}>
          <Link href="my">
            {nickname}
            <h5 className="font-medium inline"> 님 반가워요!</h5>
          </Link>
        </h4>
      ) : (
        <h4
          className="ml-3 text-xl font-medium inline hover:cursor-pointer hover:underline"
          onClick={closeDrawer}
        >
          <Link href="/login">[로그인하기]</Link>
        </h4>
      )}
    </div>
  );
}

export default DrawerMyProfile;
