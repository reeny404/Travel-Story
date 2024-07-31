import { PropsWithChildren } from "react";

function PlanLayout({ children }: PropsWithChildren) {
  return <div className="max-w-96 mx-auto">{children}</div>;
}

export default PlanLayout;
