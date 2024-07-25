"use client";
import { ChangeEvent, FormEvent } from "react";

type AuthFormProps = {
  label: string;
  placeholder?: string;
  isPassword?: boolean;
  isInputValid: boolean;
  onSubmit: () => void;
  onChange: (value: string) => void;
};

function AuthForm({
  label,
  placeholder = "",
  isPassword = false,
  isInputValid = true,
  onSubmit,
  onChange,
}: AuthFormProps) {
  //input change마다 상태가 바뀌게하는 함수
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.currentTarget.value;
    onChange(input);
  };

  //submit 될때 supabase 로직 넣는 함수
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="text-[14px]">
        {label}
        <input
          onChange={handleChange}
          placeholder={placeholder}
          type={isPassword ? "password" : "text"}
          autoComplete="new-password"
          className="w-full h-[48px] text-[20px] border-b border-black bg-transparent focus:outline-none placeholder:text-gray-300"
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
