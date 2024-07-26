"use client";
import { useAuthStore } from "@/stores/auth.store";
import { emailValidCheck } from "@/utils/emailCheck";
import axios from "axios";
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
    try {
      const response = await axios.get("/api/auth/user", {
        params: {
          email: email,
        },
      });
      if (response.status === 200) {
        setStep("password");
      } else if (response.status === 201) {
        setStep("add-user");
      }
    } catch (error) {
      console.log("이메일 확인 도중 오류발생: ", error);
    }
  };

  // 로그인 password 버튼 누를 시
  const handlePasswordSubmit = async (password: string) => {
    setLabelText("");
    try {
      const response = await axios.post("/api/auth/login", {
        email: user.email,
        password: password,
      });

      if (response.status === 200) {
        console.log("로그인 완료: ", response.data);
      } else {
        console.log("로그인 실패: ", response.data);
      }
    } catch (error) {
      console.log("로그인 중에 오류 발생함: ", error);
    }
  };

  // 회원가입 nickname 버튼 누를 시
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
        console.log("회원가입 완료: ", response.data);
      } else {
        console.log("회원가입 실패:", response.data);
      }
    } catch (e) {
      console.log("회원가입 중 오류 발생:", e);
    }
  };

  //회원가입 email 버튼 누를 시
  const handleSignupSubmit = (email: string) => {
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

  //객체로
  return {
    step,
    labelText,
    labelColor,
    isInputValid,
    handleEmailSubmit,
    handlePasswordSubmit,
    handleNickSubmit,
    handleEmailChange,
    handlePasswordChange,
    handleSignupSubmit,
    handleNickChange,
    handleNewPasswordSubmit,
    handleCheckPasswordSubmit,
    handleCheckPassword,
  };
}

export default useAuthFlow;
