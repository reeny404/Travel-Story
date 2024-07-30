"use client";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

type AuthPageProps = {
  title: string;
  isSocialHidden?: boolean;
};

function AuthPage({
  title,
  isSocialHidden = false,
  children,
}: PropsWithChildren<AuthPageProps>) {
  const supabase = createClient();
  const router = useRouter();

  const handleKakaoLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      // options: {
      //   redirectTo: `/api/auth/callback`,
      // },
    });
    if (error) {
      console.log("소셜로그인 중 에러: ", error);
    } else {
      // console.log(data);
      // router.push("/");
    }
  };

  return (
    <div className="w-full flex-grow px-4 pt-12 bg-[#F8F8F8]">
      {/* title */}
      <h1 className="text-[24px] font-semibold mb-[68px] whitespace-pre-wrap">
        {title}
      </h1>
      {/* 이메일 로그인 */}
      {children}
      {/* 소셜 로그인 */}
      {isSocialHidden && (
        <div className="mt-[79px]">
          <div className="flex justify-evenly items-center">
            <div className="flex-grow h-[1px] bg-gray-200"></div>
            <p className="text-gray-300 mx-2 text-[14px]">또는</p>
            <div className="flex-grow h-[1px] bg-gray-200"></div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleKakaoLogin}
              className="w-full h-[48px] bg-[#F9E000] rounded-md"
            >
              카카오로 계속하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthPage;
