import { useState } from "react";

function useAuthFlow() {
  const [step, setStep] = useState<string>("email");

  //email 버튼 누를 시
  const handleEmailSubmit = () => {};

  //password 버튼 누를 시
  const handlePasswordSubmit = () => {};

  //nickname 버튼 누를 시
  const handleSignupSubmit = () => {};
}

export default useAuthFlow;
