import { Suspense } from "react";
import Login from "./_components/Login/Login";

function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}

export default LoginPage;
