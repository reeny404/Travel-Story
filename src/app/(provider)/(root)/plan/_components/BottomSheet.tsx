"use client";
import PlanAPI from "@/apis/plan.api"; // 추가
import { BottomSheetType } from "@/types/plan";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import BottomSheetCheckList from "../_components/BottomSheetCheckList";
import BottomSheetImages from "../_components/BottomSheetImages";
import BottomSheetInput from "../_components/BottomSheetInput";
import BottomSheetTitle from "../_components/BottomSheetTitle";
import UpdateButton from "../_components/UpdateButton";

type BottomSheetProps = BottomSheetType & {
  onClose: () => void;
  planId: string;
  id?: string; // 추가
};

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 환경 변수로 설정된 API URL 사용
  timeout: 1000,
});

const planAPI = new PlanAPI(apiClient);

function BottomSheet({
  type,
  status: initialStatus,
  onClose,
  planId,
  id,
}: BottomSheetProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [images, setImages] = useState<string[]>(type === "memo" ? [] : []);
  const [checkList, setCheckList] = useState(
    type === "memo" ? [{ text: "사진 찍기", isCheck: false }] : []
  );
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

  const handleUpdate = async () => {
    const data = getFormData();
    data.images = images;
    data.planId = planId;
    data.type = type;
    if (type === "memo") {
      data.checkList = checkList;
    }
    data.id = id; // id 추가
    console.log(data);
    try {
      const response = await planAPI.updatePlan(planId, data); // PlanAPI 사용

      if (!response) {
        console.error("Error updating data");
        return;
      }

      console.log("데이터 업데이트됨", response);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleRead = () => {
    setStatus("update");
  };

  const handleAdd = async () => {
    const data = getFormData();
    data.images = JSON.stringify(images);
    data.planId = planId;
    data.type = type;
    if (type === "memo") {
      data.checkList = checkList;
    }
    console.log(data);
    try {
      const response = await planAPI.addPlan(planId, data); // PlanAPI 사용

      if (!response) {
        console.error("Error adding data");
        return;
      }

      console.log("데이터 추가됨", response);
    } catch (error) {
      console.error("Error adding data:", error);
    }
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
        {type === "place" ||
          (type === "customePlace" && (
            <BottomSheetInput type="place" isDisabled={status === "read"} />
          ))}
        {type === "memo" && (
          <BottomSheetCheckList
            type={type}
            status={status}
            checkList={checkList}
            setCheckList={setCheckList}
          />
        )}
        <BottomSheetImages
          type={type}
          status={status}
          images={images}
          setImages={setImages}
        />

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
    planId,
    id, // 추가
  }: BottomSheetProps) {
    return (
      <BottomSheet
        type={type}
        status={status}
        onClose={onClose}
        planId={planId}
        id={id} // 전달
      />
    );
  };
}

export default BottomSheet;
