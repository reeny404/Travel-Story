"use client";
import clsx from "clsx";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

type AuthFormProps = {
  label: string;
  labelColor: string;
  placeholder?: string;
  isPassword?: boolean;
  isInputValid: boolean;
  value?: string;
  onSubmit: (value: string) => void;
  onChange: (value: string) => void;
};

function AuthForm({
  label,
  placeholder = "",
  labelColor,
  isPassword = false,
  isInputValid = true,
  value = "",
  onSubmit,
  onChange,
}: AuthFormProps) {
  const [isInputPassword, setIsPassword] = useState<boolean>(isPassword);
  const inputRef = useRef<HTMLInputElement>(null);

  const textColor = clsx({
    "text-black": labelColor === "black",
    "text-[#FF0000]": labelColor === "red",
    "text-[#00B53C]": labelColor === "green",
  });

  // input change마다 상태가 바뀌게하는 함수
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.currentTarget.value;
    onChange(input);
  };

  // submit 될때 supabase 로직 넣는 함수
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value as string;
    onSubmit(value);
  };

  // 비밀번호 눈 아이콘 클릭 시
  const handleEyeClick = () => {
    setIsPassword(!isInputPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={clsx("text-[14px]", textColor)}>
        {label}
        <div className="relative">
          <input
            onChange={handleChange}
            ref={inputRef}
            placeholder={placeholder}
            type={isInputPassword ? "password" : "text"}
            autoComplete="new-password"
            defaultValue={value}
            readOnly={value ? true : false}
            className="w-full h-[48px] text-[20px] text-black border-b border-black bg-transparent focus:outline-none focus:border-[#007AFF] placeholder:text-gray-300"
          />
          {isPassword && (
            <Image
              src={`/icon/login/${
                isInputPassword ? "password-eye-crossed" : "password-eye"
              }.svg`}
              width={18}
              height={18}
              alt="password icon"
              onClick={handleEyeClick}
              className="absolute top-[15px] right-[15px] cursor-pointer"
            />
          )}
        </div>
      </label>
      <button
        disabled={isInputValid}
        className="w-full h-[48px] bg-black text-white text-center rounded-md mt-[96px] disabled:bg-[#CECECE]"
      >
        계속하기
      </button>
    </form>
  );
}

export default AuthForm;
