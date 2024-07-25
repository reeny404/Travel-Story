"use client";
import { useAuthStore } from "@/stores/authStore";
import { emailValidCheck } from "@/utils/emailCheck";
import axios from "axios";
import { useState } from "react";

function useAuthFlow() {
  const [step, setStep] = useState<string>("email");
  const [isInputValid, setIsInputValid] = useState<boolean>(true);
  const [labelText, setLabelText] = useState<string>("");
  const { user, putEmail, putPassword, putNickname } = useAuthStore();

  /** Change 관련 handle */
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

  /** Submit 관련 handle */
  //로그인 email 버튼 누를 시
  const handleEmailSubmit = async (email: string) => {
    putEmail(email);
    setLabelText("");
    setStep("add-user");
  };

  //로그인 password 버튼 누를 시
  const handlePasswordSubmit = () => {
    setLabelText("");
    console.log("로그인 완료");
  };

  //회원가입 nickname 버튼 누를 시
  const handleNickSubmit = async (nickname: string) => {
    putNickname(nickname);
    console.log(user.email, user.password);
    try {
      const response = await axios.post("/api/auth/signup", {
        email: user.email,
        password: user.password,
        nickname: nickname,
      });
      if (response.status === 200) {
        console.log("회원가입 완료", response.data);
      } else {
        console.log("회원가입 실패:", response.data);
      }
    } catch (e) {
      console.log("회원가입 중 오류 발생:", e);
    }
  };

  //회원가입 email 버튼 누를 시
  const handleSignupSubmit = (email: string) => {
    setStep("new-password");
  };

  //회원가입 password 버튼 누를 시
  const handleNewPasswordSubmit = (password: string) => {
    putPassword(password);
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
