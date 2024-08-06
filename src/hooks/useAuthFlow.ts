"use client";
import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { useAuthStore } from "@/stores/auth.store";
import { useLoginStepStore } from "@/stores/step.store";
import { emailValidCheck } from "@/utils/emailCheck";
import { getCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";

function useAuthFlow() {
  const { setStep, setLabelColor, setLabelText, setIsInputValid } =
    useLoginStepStore();
  const { user, putEmail, putPassword, putNickname } = useAuthStore();
  const router = useRouter();
  const { setUser } = useAuth();
  const isTypeExist = getCookie("hasTravelType");
  const params = useSearchParams();
  const nextURL = params.get("nextUrl") ?? "/";

  /** Change 관련 handle */
  // 로그인 email 유효성 검사
  const handleEmailChange = (email: string) => {
    const validValue = emailValidCheck(email);
    setIsInputValid(validValue);
  };

  // password 유효성 검사
  const handlePasswordChange = (password: string) => {
    if (password.length > 5) {
      setLabelText("유효한 비밀번호입니다.");
      setLabelColor("green");
      return setIsInputValid(false);
    }
    setLabelText("아직 6자리가 아니에요.");
    setLabelColor("red");
    return setIsInputValid(true);
  };

  // password check 유효성 검사
  const handleCheckPassword = (password: string) => {
    if (password === user.password) {
      setLabelColor("green");
      setLabelText("입력한 비밀번호와 일치해요!");
      return setIsInputValid(false);
    }
    setLabelColor("red");
    setLabelText("아직 입력한 비밀번호와 일치하지 않아요.");
    return setIsInputValid(true);
  };

  // nickname 유효성 검사
  const handleNickChange = (nickname: string) => {
    if (nickname.length > 7 || nickname.length < 2) {
      setLabelColor("red");
      setLabelText("2~8글자로 입력해주세요!");
      return setIsInputValid(true);
    }
    setLabelColor("green");
    setLabelText("사용하실 수 있는 이름입니다.");
    return setIsInputValid(false);
  };

  /** Submit 관련 handle */
  // 로그인 email 버튼 누를 시
  const handleEmailSubmit = async (email: string) => {
    putEmail(email);
    const nextStep = await api.auth.emailUser(email);
    setStep(nextStep);

    if (nextStep === "add-user") {
      setIsInputValid(false);
    } else {
      setIsInputValid(true);
    }
  };

  // 로그인 password 버튼 누를 시
  const handlePasswordSubmit = async (password: string) => {
    const response = await api.auth.login(user.email, password);
    if (!response) {
      setLabelColor("red");
      return setLabelText("비밀번호가 일치하지 않습니다.");
    }
    setUser(response.data.session.user);
    if (isTypeExist) {
      return router.replace(nextURL);
    }
    return router.replace("/onboard");
  };

  // 회원가입 email 버튼 누를 시
  const handleSignupSubmit = () => {
    setIsInputValid(true);
    setStep("new-password");
  };

  // 회원가입 password 버튼 누를 시
  const handleNewPasswordSubmit = (password: string) => {
    setIsInputValid(true);
    putPassword(password);
    setLabelColor("black");
    setStep("check-password");
  };

  // 회원가입 password check 버튼 누를 시
  const handleCheckPasswordSubmit = () => {
    setIsInputValid(true);
    setLabelColor("black");
    setStep("nickname");
  };

  // 회원가입 nickname 버튼 누를 시
  const handleNickSubmit = async (nickname: string) => {
    putNickname(nickname);
    if (!user.password) {
      setLabelColor("red");
      return setLabelText("오류가 발생했습니다. 다시 시도해주세요.");
    }
    const response = await api.auth.signUp(user.email, user.password, nickname);
    setUser(response.data.session.user);
    if (isTypeExist) {
      return router.replace("/");
    }
    return router.replace("/onboard");
  };

  return {
    submit: {
      handleEmailSubmit,
      handlePasswordSubmit,
      handleNickSubmit,
      handleSignupSubmit,
      handleNewPasswordSubmit,
      handleCheckPasswordSubmit,
    },
    change: {
      handleEmailChange,
      handlePasswordChange,
      handleNickChange,
      handleCheckPassword,
    },
  };
}

export default useAuthFlow;
