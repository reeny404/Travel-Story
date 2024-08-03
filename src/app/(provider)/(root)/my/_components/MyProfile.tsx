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
    queryFn: () => api.auth.userProfile(user?.email as string),
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

  // 프로필 이미지 변경
  const handleProfileEdit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <section className="flex items-center mt-[21px] mb-[29px]">
      {isEdit ? (
        <>
          <div className="relative w-[60px] h-[60px]">
            <button
              onClick={(e) => handleProfileEdit(e)}
              className="absolute w-8 h-8 top-1/2 left-1/2 bg-slate-200 -translate-x-4 -translate-y-4 cursor-pointer"
            ></button>
            <Image
              src={profileUrl ? profileUrl : "/icons/avatar-gray.png"}
              alt="프로필"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col ml-[11px]">
            <input
              ref={inputRef}
              defaultValue={nickname}
              className="px-2 py-1 mb-1 rounded-lg"
            />
            <p className="text-[14px]">{user?.email}</p>
          </div>
        </>
      ) : (
        <>
          <Image
            src={profileUrl ? profileUrl : "/icons/avatar-gray.png"}
            alt="프로필"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div className="flex flex-col ml-[11px]">
            <h5>{nickname}</h5>
            <p className="text-[14px]">{user?.email}</p>
          </div>
        </>
      )}
      <button className="ml-auto" onClick={(e) => handleClickEdit(e)}>
        {isEdit ? "등록" : "편집"}
      </button>
    </section>
  );
}

export default MyProfile;
