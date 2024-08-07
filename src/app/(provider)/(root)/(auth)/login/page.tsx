"use client";
import useAuthFlow from "@/hooks/useAuthFlow";
import { useAuthStore } from "@/stores/auth.store";
import { useLoginStepStore } from "@/stores/step.store";
import { useEffect } from "react";
import AuthContainer from "./_components/AuthContainer/AuthContainer";
import AuthForm from "./_components/AuthForm/AuthForm";

function LoginPage() {
  const { submit, change } = useAuthFlow();
  const { step, labelText, labelColor, isInputValid } = useLoginStepStore();
  const { user } = useAuthStore();
  const { setLabelColor, setLabelText, setStep, setIsInputValid } =
    useLoginStepStore();

  useEffect(() => {
    setLabelColor("black");
    setLabelText("");
    setIsInputValid(true);
    setStep("email");
  }, [setLabelColor, setLabelText, setIsInputValid, setStep]);

  return (
    <>
      {step === "email" && (
        <AuthContainer
          title={"로그인하면 \n일정이 저장돼요."}
          isSocialHidden={true}
        >
          <AuthForm
            label={labelText ? labelText : "이메일을 입력하세요."}
            labelColor={labelColor}
            placeholder="example@gmail.com"
            onSubmit={submit.handleEmailSubmit}
            onChange={change.handleEmailChange}
            isInputValid={isInputValid}
          />
        </AuthContainer>
      )}
      {step === "password" && (
        <AuthContainer title={"비밀번호 입력"}>
          <AuthForm
            label={labelText ? labelText : "6자리 이상 입력하세요."}
            labelColor={labelColor}
            isPassword={true}
            onSubmit={submit.handlePasswordSubmit}
            onChange={change.handlePasswordChange}
            isInputValid={isInputValid}
          />
        </AuthContainer>
      )}
      {step === "add-user" && (
        <AuthContainer
          title={"회원정보가 없습니다.\n이 이메일로 가입하시겠어요?"}
        >
          <AuthForm
            label={labelText ? labelText : "이메일을 입력해주세요."}
            labelColor={labelColor}
            onChange={change.handleEmailChange}
            onSubmit={submit.handleSignupSubmit}
            value={user.email}
            isInputValid={isInputValid}
          />
        </AuthContainer>
      )}
      {step === "new-password" && (
        <AuthContainer title={"비밀번호를\n설정해주세요."}>
          <AuthForm
            label={labelText ? labelText : "6자리 이상 입력해주세요."}
            labelColor={labelColor}
            onChange={change.handlePasswordChange}
            onSubmit={submit.handleNewPasswordSubmit}
            isPassword={true}
            isInputValid={isInputValid}
          />
        </AuthContainer>
      )}
      {step === "check-password" && (
        <AuthContainer title={"비밀번호를\n확인해주세요."}>
          <AuthForm
            label={labelText ? labelText : "다시 한 번 입력해주세요."}
            labelColor={labelColor}
            onChange={change.handleCheckPassword}
            onSubmit={submit.handleCheckPasswordSubmit}
            isPassword={true}
            isInputValid={isInputValid}
          />
        </AuthContainer>
      )}
      {step === "nickname" && (
        <AuthContainer title={"어떤 이름으로\n불러드릴까요?"}>
          <AuthForm
            label={labelText ? labelText : "2~8글자로 입력해주세요."}
            labelColor={labelColor}
            placeholder="홍길동"
            onSubmit={submit.handleNickSubmit}
            onChange={change.handleNickChange}
            isInputValid={isInputValid}
          />
        </AuthContainer>
      )}
    </>
  );
}

export default LoginPage;
