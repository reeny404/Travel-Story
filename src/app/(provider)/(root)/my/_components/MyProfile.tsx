"use client";
import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useRef, useState } from "react";

function MyProfile() {
  const { user } = useAuth();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { data: supabaseUser, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.auth.userProfile(user?.email as string),
  });

  if (!user) return router.replace("/");

  const profileUrl = supabaseUser.image_url;
  const nickname = supabaseUser.nickname;

  // 편집버튼 누를 때
  const handleClickEdit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!isEdit) return setIsEdit(!isEdit);
    const editNick = inputRef.current?.value as string;
    const email = user.email;
    if (nickname !== editNick) {
      api.auth.updateUser(email as string, editNick);
    }
    setIsEdit(!isEdit);
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <section className="flex items-center mt-[21px] mb-[29px]">
      {isEdit ? <EditSection /> : <ProfileSection />}
      <button className="ml-auto" onClick={(e) => handleClickEdit(e)}>
        {isEdit ? "등록" : "편집"}
      </button>
    </section>
  );

  /** 프로필 div  */
  function ProfileSection() {
    return (
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
    );
  }

  /** 편집할 때 div */
  function EditSection() {
    return (
      <>
        <Image
          src={profileUrl ? profileUrl : "/icons/avatar-gray.png"}
          alt="프로필"
          width={60}
          height={60}
          className="rounded-full"
        />
        <div className="flex flex-col ml-[11px]">
          <input
            ref={inputRef}
            defaultValue={nickname}
            className="px-2 py-1 mb-1 rounded-lg"
          />
          <p className="text-[14px]">{user?.email}</p>
        </div>
      </>
    );
  }
}

export default MyProfile;
