"use client";
import { ChangeEvent, FormEvent, useRef } from "react";

type AuthFormProps = {
  label: string;
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
  isPassword = false,
  isInputValid = true,
  value = "",
  onSubmit,
  onChange,
}: AuthFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  //input change마다 상태가 바뀌게하는 함수
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.currentTarget.value;
    onChange(input);
  };

  //submit 될때 supabase 로직 넣는 함수
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value as string;
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="text-[14px]">
        {label}
        <input
          onChange={handleChange}
          ref={inputRef}
          placeholder={placeholder}
          type={isPassword ? "password" : "text"}
          autoComplete="new-password"
          defaultValue={value}
          readOnly={value ? true : false}
          className="w-full h-[48px] text-[20px] border-b border-black bg-transparent focus:outline-none focus:border-[#007AFF] placeholder:text-gray-300"
        />
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
