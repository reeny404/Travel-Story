"use client";
import useAuthFlow from "@/hooks/useAuthFlow";
import AuthForm from "./_components/AuthForm/AuthForm";
import AuthPage from "./_components/AuthPage/AuthPage";

function Login() {
  const {
    step,
    labelText,
    isInputValid,
    handleEmailChange,
    handlePasswordChange,
    handleEmailSubmit,
    handlePasswordSubmit,
    handleSignupSubmit,
    handleNickSubmit,
    handleNickChange,
    handleNewPasswordSubmit,
  } = useAuthFlow();
  return (
    <>
      {step === "email" && (
        <AuthPage title={"로그인하면 \n일정이 저장돼요."} isSocialHidden={true}>
          <AuthForm
            label={labelText ? labelText : "이메일을 입력하세요."}
            placeholder="example@gmail.com"
            onSubmit={handleEmailSubmit}
            onChange={handleEmailChange}
            isInputValid={isInputValid}
          />
        </AuthPage>
      )}
      {step === "password" && (
        <AuthPage title={"비밀번호 입력"}>
          <AuthForm
            label={labelText ? labelText : "6자리 이상 입력하세요."}
            isPassword={true}
            onSubmit={handlePasswordSubmit}
            onChange={handlePasswordChange}
            isInputValid={isInputValid}
          />
        </AuthPage>
      )}
      {step === "add-user" && (
        <AuthPage title={"회원정보가 없습니다.\n이계정으로 가입하시겠어요?"}>
          <AuthForm
            label={labelText ? labelText : "이메일을 입력해주세요."}
            onChange={handleEmailChange}
            onSubmit={handleSignupSubmit}
            isInputValid={isInputValid}
          />
        </AuthPage>
      )}
      {step === "new-password" && (
        <AuthPage title={"비밀번호를\n설정해주세요."}>
          <AuthForm
            label={labelText ? labelText : "6자리 이상 입력해주세요."}
            onChange={handlePasswordChange}
            onSubmit={handleNewPasswordSubmit}
            isPassword={true}
            isInputValid={isInputValid}
          />
        </AuthPage>
      )}
      {step === "nickname" && (
        <AuthPage title={"어떤 이름으로\n불러드릴까요?"}>
          <AuthForm
            label={labelText ? labelText : "2~8글자로 입력해주세요."}
            placeholder="홍길동"
            onSubmit={handleNickSubmit}
            onChange={handleNickChange}
            isInputValid={isInputValid}
          />
        </AuthPage>
      )}
    </>
  );
}

export default Login;
