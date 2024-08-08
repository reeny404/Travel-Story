import { Suspense } from "react";
import OnBoard from "./_components/OnBoard/OnBoard";

function OnBoardPage() {
  return (
    <Suspense>
      <OnBoard />
    </Suspense>
  );
}

export default OnBoardPage;
