"use client";
import { emailValidCheck } from "@/utils/emailCheck";
import { ChangeEvent, useState } from "react";

type AuthFormProps = {
  label: string;
  placeholder?: string;
  isPassword?: boolean;
};

function AuthForm({
  label,
  placeholder = "",
  isPassword = false,
}: AuthFormProps) {
  const [isInputValid, setIsInputValid] = useState<boolean>(true);
  const [labelText, setLabelText] = useState<string>(label);
  //이메일 유효성 검사
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.currentTarget.value;
    const validValue = emailValidCheck(email);
    setIsInputValid(validValue);
  };

  //비밀번호 유효성 검사
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.currentTarget.value;
    if (password.length > 5) {
      setLabelText("유효한 비밀번호입니다.");
      return setIsInputValid(false);
    }
    setLabelText("아직 6자리가 아니에요.");
    return setIsInputValid(true);
  };

  return (
    <form>
      <label className="text-[14px]">
        {labelText}
        <input
          onChange={isPassword ? handlePasswordChange : handleEmailChange}
          placeholder={placeholder}
          type={isPassword ? "password" : "text"}
          autoComplete="off"
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
