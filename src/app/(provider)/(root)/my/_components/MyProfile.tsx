"use client";
import { api } from "@/apis/api";
import SvgIcon from "@/components/commons/SvgIcon";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";

type ResponseType = { data: { publicUrl: string } };

type SupabaseUser = {
  id: string;
  email: string;
  nickname: string;
  image_url: string;
};

function MyProfile({ user }: { user: SupabaseUser }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { putImage } = useAuthStore();
  const [imageURL, setImageURL] = useState<string>(user.image_url);

  useEffect(() => {
    console.log(user);
  }, []);

  const profileUpdate = async (file: File): Promise<ResponseType> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", user.id);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageURL(reader.result as string);
      putImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    const response = await api.auth.updateProfile(formData);
    return response;
  };

  const mutation = useMutation({
    mutationFn: profileUpdate,
  });

  /** 닉네임 편집 */
  // 닉네임 편집 버튼 누를 때
  const handleNickClick = () => {
    if (!isEdit) {
      setIsEdit(!isEdit);
    }
  };
  // 닉네임 변경 사항 등록
  const handleNickChange = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const editNick = inputRef.current?.value as string;
    if (user?.nickname !== editNick) {
      api.auth.updateUser(user.email as string, editNick);
    }
    setIsEdit(!isEdit);
  };

  /** 프로필 사진 */
  // image 변경할 때
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      mutation.mutate(file);
    }
  };

  const handleLabelClick = () => {
    document.getElementById("file-input")?.click();
  };

  return (
    <section className="flex flex-col w-full items-center mt-12 mb-[29px] z-10">
      <div className="relative">
        <div className="relative aspect-square w-[88px] h-[88px] rounded-full bg-neutral-200">
          <Image
            src={imageURL ?? "/icons/avatar.svg"}
            alt="profile Image"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="file-input"
          onChange={handleImageChange}
        />
        <label
          onClick={handleLabelClick}
          htmlFor="file-input"
          className="absolute flex justify-center items-center w-7 h-7 bg-white rounded-full right-0 bottom-0"
        >
          <SvgIcon name="picture" width={16} />
        </label>
      </div>
      {/* 닉네임 편집 시 */}
      {isEdit ? (
        <form className="w-fit h-fit">
          <input
            ref={inputRef}
            defaultValue={user.nickname || ""}
            className="w-[150px] mt-4 py-1 px-3 rounded-lg outline-none"
          />
          <button
            onClick={(e) => handleNickChange(e)}
            className=" ml-2 py-1 px-2 bg-primary text-white text-sm rounded-lg"
          >
            등록
          </button>
        </form>
      ) : (
        // 닉네임 편집하지 않을 때
        <div className="relative flex items-center mt-4">
          <h5 className="text-xl leading-6 font-semibold">{user.nickname}</h5>
          <SvgIcon
            name="edit"
            width={16}
            onClick={handleNickClick}
            className="absolute -right-5"
          />
        </div>
      )}
    </section>
  );
}

export default MyProfile;
