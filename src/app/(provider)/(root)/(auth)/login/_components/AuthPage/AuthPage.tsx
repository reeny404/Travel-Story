"use client";
import { ChangeEvent, useState } from "react";

type AuthPageProps = {
  title: string;
  label: string;
  isPasswordInput?: boolean;
  isSocialHidden?: boolean;
};

function AuthPage({
  title,
  label,
  isPasswordInput = false,
  isSocialHidden = false,
}: AuthPageProps) {
  const [isInputFilled, setIsInputFilled] = useState<boolean>(true);

  const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

  const emailValidCheck = (email: string) => {
    if (pattern.test(email) === false) {
      return true;
    } else {
      return false;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.currentTarget.value;
    const validValue = emailValidCheck(email);
    setIsInputFilled(validValue);
  };

  return (
    <div className="w-full flex-grow px-4 pt-12 bg-[#F8F8F8]">
      {/* title */}
      <h1 className="text-[24px] font-semibold mb-[68px]">{}</h1>
      {/* 이메일 로그인 */}
      <form>
        <label className="text-[14px]">
          {label}
          <input
            onChange={handleInputChange}
            placeholder="example@email.com"
            className="w-full h-[48px] text-[20px] border-b border-black bg-transparent focus:outline-none placeholder:text-gray-300"
          />
        </label>
        <button
          disabled={isInputFilled}
          className="w-full h-[48px] bg-black text-white text-center rounded-md mt-[96px] disabled:bg-[#CECECE]"
        >
          계속하기
        </button>
      </form>
      {/* 소셜 로그인 */}
      {isSocialHidden && (
        <div className="mt-[79px]">
          <div className="flex justify-evenly items-center">
            <div className="flex-grow h-[1px] bg-gray-200"></div>
            <p className="text-gray-300 mx-2">또는</p>
            <div className="flex-grow h-[1px] bg-gray-200"></div>
          </div>
          <div className="mt-4">
            <button className="w-full h-[48px] bg-[#F9E000] rounded-md">
              카카오로 계속하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthPage;
