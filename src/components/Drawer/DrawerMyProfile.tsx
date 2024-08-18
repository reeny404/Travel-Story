"use client";

import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import useDrawerStore from "@/stores/drawer.store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import SvgIcon from "../commons/SvgIcon";

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
    <Link href={user ? "/my" : "/login"}>
      <div
        className="flex justify-between items-center px-6 py-4 cursor-pointer"
        onClick={closeDrawer}
      >
        <div className="relative flex items-center">
          {profileImage ? (
            <div className="relative aspect-square w-10 h-10 rounded-full bg-neutral-200">
              <Image
                src={profileImage}
                alt="profile Image"
                fill
                className="object-cover rounded-full"
              />
            </div>
          ) : (
            <Image
              src="/icons/avatar.svg"
              alt="profile Image"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          {user ? (
            <h4 className="ml-3 text-xl font-semibold">
              {nickname}
              <span className="font-medium inline"> 님 반가워요!!</span>
            </h4>
          ) : (
            <h4 className="ml-3 text-xl font-medium inline">로그인하기</h4>
          )}
        </div>
        <SvgIcon name="angle-right" title="angle" width={20} height={20} />
      </div>
    </Link>
  );
}

export default DrawerMyProfile;
