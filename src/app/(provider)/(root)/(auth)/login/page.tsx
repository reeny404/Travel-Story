import AuthForm from "./_components/AuthForm/AuthForm";
import AuthPage from "./_components/AuthPage/AuthPage";

function Login() {
  return (
    <AuthPage title={"로그인하면 \n일정이 저장돼요."} isSocialHidden={true}>
      <AuthForm label="비밀번호를 6자리 이상 입력해주세요." isPassword={true} />
    </AuthPage>
  );
}

export default Login;
