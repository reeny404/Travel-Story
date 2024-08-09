import { PropsWithChildren } from "react";

function PlanLayout({ children }: PropsWithChildren) {
  return <div className="mx-auto">{children}</div>;
}

export default PlanLayout;
