"use client";
import { BottomSheetType } from "@/types/plan";
import { useEffect, useRef, useState } from "react";
import BottomSheetInput from "./BottomSheetInput";
import BottomSheetTitle from "./BottomSheetTitle";

type BottomSheetProps = BottomSheetType & {
  onClose: () => void;
};

function BottomSheet({ type, status, onClose }: BottomSheetProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  useEffect(() => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 300);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 ${
        isOpening || isClosing ? "transition-opacity duration-300" : ""
      } ${isOpening ? "bg-opacity-0" : "bg-opacity-50"} bg-black`}
      onClick={handleClose}
    >
      <form
        ref={formRef}
        className={`absolute bottom-0 left-0 w-full h-auto py-4 pb-8 px-4 flex flex-col gap-3 rounded-t-3xl shadow-bottom-sheet bg-white transform ${
          isClosing
            ? "translate-y-full"
            : isOpening
            ? "translate-y-full"
            : "translate-y-0"
        } transition-transform duration-300`}
      >
        <BottomSheetTitle type={type} status={status} />
        <BottomSheetInput type="time" isDisabled={status === "read"} />
        <BottomSheetInput type="memo" isDisabled={status === "read"} />
        <BottomSheetInput type="spend" isDisabled={status === "read"} />
        <BottomSheetInput type="place" isDisabled={status === "read"} />
      </form>
    </div>
  );
}

export function createBottomSheet() {
  return function BottomSheetWrapper({
    type,
    status,
    onClose,
  }: BottomSheetProps) {
    return <BottomSheet type={type} status={status} onClose={onClose} />;
  };
}

export default BottomSheet;
