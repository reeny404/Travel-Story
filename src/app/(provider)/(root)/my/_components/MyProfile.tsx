"use client";
import Image from "next/image";
import { useRef, useState } from "react";

type SupabaseUser = {
  image_url: string;
  nickname: string;
};

function MyProfile({ image_url, nickname }: SupabaseUser) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 편집버튼 누를 때
  // const handleClickEdit = (
  //   e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   if (!isEdit) return setIsEdit(!isEdit);
  //   const editNick = inputRef.current?.value as string;
  //   const email = user?.email;
  //   if (nickname !== editNick) {
  //     api.auth.updateUser(email as string, editNick);
  //   }
  //   setIsEdit(!isEdit);
  // };

  return (
    <section className="flex flex-col w-full items-center mt-12 mb-[29px] z-10">
      <Image
        src={image_url ? image_url : "/icons/avatar.svg"}
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
