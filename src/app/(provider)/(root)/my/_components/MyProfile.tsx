"use client";
import SvgIcon from "@/components/commons/SvgIcon";
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
  const handleNickClick = () => {
    // if (!isEdit) return setIsEdit(!isEdit);
    // const editNick = inputRef.current?.value as string;
    // const email = user?.email;
    // if (nickname !== editNick) {
    //   api.auth.updateUser(email as string, editNick);
    // }
    // setIsEdit(!isEdit);
  };

  const handlePictureClick = () => {};

  return (
    <section className="flex flex-col w-full items-center mt-12 mb-[29px] z-10">
      <div className="relative">
        <Image
          src={image_url ? image_url : "/icons/avatar.svg"}
          alt="프로필"
          width={88}
          height={88}
          className="rounded-full"
        />
        <div
          onClick={handlePictureClick}
          className="absolute flex justify-center items-center w-7 h-7 bg-white rounded-full right-0 bottom-0"
        >
          <SvgIcon name="picture" width={16} />
        </div>
      </div>
      <div className="relative flex items-center mt-4">
        <h5 className="text-xl leading-6 font-semibold">{nickname}</h5>
        <SvgIcon
          name="edit"
          width={16}
          onClick={handleNickClick}
          className="absolute -right-5"
        />
      </div>
    </section>
  );
}

export default MyProfile;
