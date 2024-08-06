"use client";
import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { MouseEvent, useRef, useState } from "react";

type SupabaseUser = {
  image_url: string;
  nickname: string;
};

function MyProfile() {
  const { user } = useAuth();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: supabaseUser, isPending } = useQuery<SupabaseUser>({
    queryKey: ["users"],
    queryFn: async () => await api.auth.userProfile(user?.email as string),
  });

  const profileUrl = supabaseUser?.image_url;
  const nickname = supabaseUser?.nickname;

  // 편집버튼 누를 때
  const handleClickEdit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!isEdit) return setIsEdit(!isEdit);
    const editNick = inputRef.current?.value as string;
    const email = user?.email;
    if (nickname !== editNick) {
      api.auth.updateUser(email as string, editNick);
    }
    setIsEdit(!isEdit);
  };

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
    <section className="flex flex-col w-full items-center mt-[21px] mb-[29px]">
      <Image
        src={profileUrl ? profileUrl : "/icons/avatar.svg"}
        alt="프로필"
        width={88}
        height={88}
        className="rounded-full"
      />
      <h5 className="text-xl leading-6 mt-4 font-semibold">{nickname}</h5>
    </section>
  );
}

export default MyProfile;
