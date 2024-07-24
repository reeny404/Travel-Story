import AuthPage from "./_components/AuthPage/AuthPage";

function Login() {
  return (
    <AuthPage
      title="login"
      label="이메일을 입력해주세요"
      isSocialHidden={true}
    />
  );
}

export default Login;
