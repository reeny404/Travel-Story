"use client";
import Header from "@/components/commons/Header";
import { ICON } from "@/constants/icon";
import { usePathStore } from "@/stores/path.store";
import { useLoginStepStore } from "@/stores/step.store";
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
  const { step, setStep, setLabelColor, setLabelText, setIsInputValid } =
    useLoginStepStore();
  const { prevPath } = usePathStore();
  const router = useRouter();

  const handleKakaoLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
    });
    if (error) {
      console.error("소셜로그인 중 에러: ", error);
    }
  };

  const handleStepBack = () => {
    setLabelText("");
    setLabelColor("black");
    setIsInputValid(true);
    switch (step) {
      case "email":
        router.back();
        break;
      case "password":
        setStep("email");
        break;
      case "add-user":
        setStep("email");
        break;
      case "new-password":
        setStep("add-user");
        setIsInputValid(false);
        break;
      case "check-password":
        setStep("new-password");
        break;
      case "nickname":
        setStep("check-password");
        break;
    }
  };

  return (
    <>
      <Header
        title="로그인"
        leftIcons={[
          {
            icon: ICON.arrow.back.black,
            alt: "back",
            size: 20,
            onClick: handleStepBack,
          },
        ]}
      />
      <div
        className="w-full px-4 pt-12 bg-[#F8F8F8]"
        style={{ minHeight: "calc(100vh - 52px)" }}
      >
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
    </>
  );
}

export default AuthPage;
