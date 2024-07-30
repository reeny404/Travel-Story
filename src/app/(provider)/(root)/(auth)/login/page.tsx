"use client";
import useAuthFlow from "@/hooks/useAuthFlow";
import { useAuthStore } from "@/stores/auth.store";
import { useStepStore } from "@/stores/step.store";
import AuthForm from "./_components/AuthForm/AuthForm";
import AuthPage from "./_components/AuthPage/AuthPage";

function Login() {
  const { state, submit, change } = useAuthFlow();
  const { isInputValid } = state;
  const { step, labelText, labelColor } = useStepStore();
  const { user } = useAuthStore();

  return (
    <>
      {step === "email" && (
        <AuthPage title={"로그인하면 \n일정이 저장돼요."} isSocialHidden={true}>
          <AuthForm
            label={labelText ? labelText : "이메일을 입력하세요."}
            labelColor={labelColor}
            placeholder="example@gmail.com"
            onSubmit={submit.handleEmailSubmit}
            onChange={change.handleEmailChange}
            isInputValid={isInputValid}
          />
        </AuthPage>
      )}
      {step === "password" && (
        <AuthPage title={"비밀번호 입력"}>
          <AuthForm
            label={labelText ? labelText : "6자리 이상 입력하세요."}
            labelColor={labelColor}
            isPassword={true}
            onSubmit={submit.handlePasswordSubmit}
            onChange={change.handlePasswordChange}
            isInputValid={isInputValid}
          />
        </AuthPage>
      )}
      {step === "add-user" && (
        <AuthPage title={"회원정보가 없습니다.\n이계정으로 가입하시겠어요?"}>
          <AuthForm
            label={labelText ? labelText : "이메일을 입력해주세요."}
            labelColor={labelColor}
            onChange={change.handleEmailChange}
            onSubmit={submit.handleSignupSubmit}
            value={user.email}
            isInputValid={isInputValid}
          />
        </AuthPage>
      )}
      {step === "new-password" && (
        <AuthPage title={"비밀번호를\n설정해주세요."}>
          <AuthForm
            label={labelText ? labelText : "6자리 이상 입력해주세요."}
            labelColor={labelColor}
            onChange={change.handlePasswordChange}
            onSubmit={submit.handleNewPasswordSubmit}
            isPassword={true}
            isInputValid={isInputValid}
          />
        </AuthPage>
      )}
      {step === "check-password" && (
        <AuthPage title={"비밀번호를\n확인해주세요."}>
          <AuthForm
            label={labelText ? labelText : "다시 한 번 입력해주세요."}
            labelColor={labelColor}
            onChange={change.handleCheckPassword}
            onSubmit={submit.handleCheckPasswordSubmit}
            isPassword={true}
            isInputValid={isInputValid}
          />
        </AuthPage>
      )}
      {step === "nickname" && (
        <AuthPage title={"어떤 이름으로\n불러드릴까요?"}>
          <AuthForm
            label={labelText ? labelText : "2~8글자로 입력해주세요."}
            labelColor={labelColor}
            placeholder="홍길동"
            onSubmit={submit.handleNickSubmit}
            onChange={change.handleNickChange}
            isInputValid={isInputValid}
          />
        </AuthPage>
      )}
    </>
  );
}

export default Login;
