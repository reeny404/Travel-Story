"use client";
import { api } from "@/apis/api";
import { useAuthStore } from "@/stores/auth.store";
import { emailValidCheck } from "@/utils/emailCheck";
import { useState } from "react";

function useAuthFlow() {
  const [step, setStep] = useState<string>("email");
  const [isInputValid, setIsInputValid] = useState<boolean>(true);
  const [labelText, setLabelText] = useState<string>("");
  const [labelColor, setLabelColor] = useState<string>("text-black");
  const { user, putEmail, putPassword, putNickname } = useAuthStore();

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
    setLabelText("");
    const nextStep = await api.auth.emailUser(email);
    setStep(nextStep);
  };

  // 로그인 password 버튼 누를 시
  const handlePasswordSubmit = async (password: string) => {
    setLabelText("");
    const response = await api.auth.login(user.email, password);
    if (response?.status === 201) {
      setLabelColor("red");
      setLabelText("비밀번호가 일치하지 않습니다.");
    } else {
      // 로그인한 유저 데이터 저장하는 로직 넣을 곳
      console.log(response?.data);
    }
  };

  // 회원가입 nickname 버튼 누를 시
  const handleNickSubmit = async (nickname: string) => {
    putNickname(nickname);
    console.log(user.email, user.password);
    await api.auth.signUp(user.email, user.password, nickname);
  };

  //회원가입 email 버튼 누를 시
  const handleSignupSubmit = () => {
    setLabelText("");
    setStep("new-password");
  };

  //회원가입 password 버튼 누를 시
  const handleNewPasswordSubmit = (password: string) => {
    setLabelText("");
    putPassword(password);
    setLabelColor("black");
    setStep("check-password");
  };

  const handleCheckPasswordSubmit = () => {
    setLabelText("");
    setLabelColor("black");
    setStep("nickname");
  };

  return {
    state: {
      step,
      labelText,
      labelColor,
      isInputValid,
    },
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
