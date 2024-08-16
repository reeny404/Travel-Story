"use client";
import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import { useLoginStepStore } from "@/stores/step.store";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

type AuthPageProps = {
  title: string;
  isSocialHidden?: boolean;
};

function AuthContainer({
  title,
  isSocialHidden = false,
  children,
}: PropsWithChildren<AuthPageProps>) {
  const router = useRouter();
  const supabase = createClient();
  const { progress } = useLoginStepStore();
  const { nextURL } = useLoginStepStore();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleKakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${baseURL}/api/auth/callback?next=${encodeURIComponent(nextURL)}`,
      },
    });
    if (error) {
      console.error("소셜로그인 중 에러: ", error);
    }
  };

  return (
    <MainLayout
      headerProps={{
        title: "로그인",
        backgroundColor: "noShadow",
        leftIcons: [
          {
            icon: ICON.arrow.back.black,
            alt: "back",
            size: 20,
            onClick: router.back,
          },
        ],
      }}
    >
      {progress !== 0 ? <ProgressBar /> : null}
      <div className="relative w-full px-4 pt-[56px] bg-white">
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
    </MainLayout>
  );
}

export default AuthContainer;
