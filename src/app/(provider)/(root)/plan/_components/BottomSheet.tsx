"use client";
import { BottomSheetType } from "@/types/plan";
import { useEffect, useRef, useState } from "react";
import BottomSheetCheckList from "./BottomSheetCheckList";
import BottomSheetImages from "./BottomSheetImages";
import BottomSheetInput from "./BottomSheetInput";
import BottomSheetTitle from "./BottomSheetTitle";
import UpdateButton from "./UpdateButton"; // 추가

type BottomSheetProps = BottomSheetType & {
  onClose: () => void;
};

function BottomSheet({
  type,
  status: initialStatus,
  onClose,
}: BottomSheetProps) {
  const [status, setStatus] = useState(initialStatus);
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

  const getFormData = () => {
    const formData = new FormData(formRef.current!);
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    return data;
  };

  const handleUpdate = () => {
    setStatus("update");
    const data = getFormData();
    // DB 업데이트 로직 구현
    console.log("데이터 업데이트됨", data);
  };
  const handleRead = () => {
    setStatus("update");
  };

  const handleAdd = () => {
    const data = getFormData();
    // DB 추가 로직 구현
    console.log("데이터 추가됨", data);
  };

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
        {type !== "memo" && (
          <BottomSheetInput type="time" isDisabled={status === "read"} />
        )}
        <BottomSheetInput type="memo" isDisabled={status === "read"} />
        {type !== "memo" && (
          <BottomSheetInput type="spend" isDisabled={status === "read"} />
        )}
        {type !== "memo" && type !== "place" && type !== "customePlace" && (
          <BottomSheetInput type="place" isDisabled={status === "read"} />
        )}
        {type === "memo" && (
          <BottomSheetCheckList type={type} status={status} />
        )}
        <BottomSheetImages type={type} status={status} />

        <UpdateButton
          status={status}
          onUpdate={handleUpdate}
          onAdd={handleAdd}
          onRead={handleRead}
        />
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
