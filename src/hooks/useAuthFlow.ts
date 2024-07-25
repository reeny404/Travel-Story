"use client";
import { emailValidCheck } from "@/utils/emailCheck";
import { useState } from "react";

function useAuthFlow() {
  const [step, setStep] = useState<string>("email");
  const [isInputValid, setIsInputValid] = useState<boolean>(true);
  const [labelText, setLabelText] = useState<string>("");

  /** input 헬퍼 텍스트 변경하는 유효성 검사 */
  //로그인 email 유효성 검사
  const handleEmailChange = (email: string) => {
    const validValue = emailValidCheck(email);
    setIsInputValid(validValue);
  };

  //password 유효성 검사
  const handlePasswordChange = (password: string) => {
    if (password.length > 5) {
      setLabelText("유효한 비밀번호입니다.");
      return setIsInputValid(false);
    }
    setLabelText("아직 6자리가 아니에요.");
    return setIsInputValid(true);
  };

  //nickname 유효성 검사
  const handleNickChange = (nickname: string) => {
    if (nickname.length > 7 || nickname.length < 2) {
      setLabelText("2~8글자로 입력해주세요!");
      return setIsInputValid(true);
    }
    setLabelText("사용하실 수 있는 이름입니다.");
    return setIsInputValid(false);
  };

  /** 각 컴포넌트에서 submit 시 로직 */
  //로그인 email 버튼 누를 시
  const handleEmailSubmit = () => {
    setLabelText("");
    setStep("add-user");
  };

  //로그인 password 버튼 누를 시
  const handlePasswordSubmit = () => {
    setLabelText("");
    console.log("로그인 완료");
  };

  //회원가입 nickname 버튼 누를 시
  const handleNickSubmit = () => {
    console.log("회원가입 완료");
  };

  //회원가입 email 버튼 누를 시
  const handleSignupSubmit = () => {
    setStep("new-password");
  };

  //회원가입 password 버튼 누를 시
  const handleNewPasswordSubmit = () => {
    setStep("nickname");
  };

  return {
    step,
    labelText,
    isInputValid,
    handleEmailSubmit,
    handlePasswordSubmit,
    handleNickSubmit,
    handleEmailChange,
    handlePasswordChange,
    handleSignupSubmit,
    handleNickChange,
    handleNewPasswordSubmit,
  };
}

export default useAuthFlow;
