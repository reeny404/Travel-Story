"use client";

import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type SupabaseUser = {
  image_url: string;
  nickname: string;
};

function DrawerMyProfile() {
  const { user } = useAuth();
  const { data: myProfile, isPending } = useQuery<SupabaseUser>({
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
          src="/logo.svg"
          alt="profile Image"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      <h4 className="ml-3 text-xl font-bold">
        {nickname} <h5 className="font-medium inline">님 반가워요!</h5>
      </h4>
    </div>
  );
}

export default DrawerMyProfile;
