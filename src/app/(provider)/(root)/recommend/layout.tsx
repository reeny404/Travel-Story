import Modal from "@/components/Modal/Modal";
import { PropsWithChildren } from "react";

function RecommendLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full w-full">
      {children}
      <Modal />
    </div>
  );
}

export default RecommendLayout;
