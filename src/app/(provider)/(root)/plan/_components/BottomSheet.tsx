"use client";

import useScheduleStore from "@/stores/schedule.store";
import {
  BottomSheetType,
  SupabaseMoveType,
  SupabaseScheduleType,
  SupbasePlanChildren,
  Todo,
} from "@/types/plan";
import { useEffect, useRef, useState } from "react";
import BottomSheetCheckList from "../_components/BottomSheetCheckList";
import BottomSheetImages from "../_components/BottomSheetImages";
import BottomSheetInput from "../_components/BottomSheetInput";
import BottomSheetTitle from "../_components/BottomSheetTitle";
import UpdateButton from "../_components/UpdateButton";
import { getInsertData, getUpdateData } from "./getInsertData";

type BottomSheetProps = BottomSheetType & {
  item?: SupbasePlanChildren;
  onClose: () => void;
  planId: string;
  day: number;
  id?: string;
};

const hasImagesUrl = (
  data?: SupbasePlanChildren
): data is SupabaseScheduleType | SupabaseMoveType => {
  return data ? "imagesUrl" in data.data : false;
};

function BottomSheet({
  item,
  type,
  status: initialStatus,
  onClose,
  planId,
  day,
  id,
}: BottomSheetProps) {
  const { createSchedule, updateSchedule } = useScheduleStore();

  const [status, setStatus] = useState(initialStatus);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [images, setImages] = useState<string[]>(
    hasImagesUrl(item) ? (item.data.imagesUrl as string[]) : []
  );
  const [checkList, setCheckList] = useState<Todo[]>(
    type === "memo" ? [{ text: "사진 찍기", isCheck: false }] : []
  );
  const [formData, setFormData] = useState<Record<string, any>>({
    title: "",
    memo: "",
    startTime: "",
    endTime: "",
    spend: "",
    place: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status === "read" && item) {
      setFormData(item.data);
    }
  }, [item, status]);

  const handleChangeTitle = (title: string) => {
    setFormData((data) => ({ ...data, title }));
  };

  const handleClose = (e?: React.MouseEvent<HTMLDivElement>) => {
    if (e && formRef.current && !formRef.current.contains(e.target as Node)) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
    } else if (!e) {
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
    // 동일한 key값의 data가 있으면 엎어쓸 확률이 있음
    // ref에서 가져오던 useState 값을 가져오던 하나로 통일 필요
    const refData = new FormData(formRef.current!);
    const data: Record<string, any> = {};
    refData.forEach((value, key) => {
      data[key] = value;
    });

    Object.keys(formData)
      .filter((key: string) => !!formData[key])
      .forEach((key) => {
        data[key] = data[key] ?? formData[key];
      });
    data.images = images;

    return data;
  };

  const handleUpdate = async () => {
    try {
      const data = getFormData();
      const newData = getUpdateData(type, data, planId, checkList);
      if (!newData) {
        console.warn("update 데이터 생성 불가");
        return;
      }
      await updateSchedule(planId, day, type, newData);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      handleClose();
    }
  };

  const handleRead = () => {
    setStatus("update");
  };

  const handleAdd = async () => {
    try {
      const data = getFormData();
      const insertData = getInsertData(type, data, planId, checkList);
      if (!insertData) {
        console.warn("insert용 데이터 생성 불가");
        return;
      }

      await createSchedule(planId, day, type, insertData);
    } catch (error) {
      console.error("Error adding data:", error);
    } finally {
      handleClose();
    }
  };
  const handleAddImage = (url: string) => {
    setImages((prev) => [...prev, url]);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50  ${
        isOpening || isClosing ? "transition-opacity duration-300" : ""
      } ${isOpening ? "bg-opacity-0" : "bg-opacity-50"} bg-black`}
      onClick={handleClose}
    >
      <form
        ref={formRef}
        className={`absolute bottom-0 left-0 w-full min-h-[34rem] h-auto py-7 px-5 flex flex-col gap-6 rounded-t-3xl shadow-bottom-sheet bg-white transform ${
          isClosing
            ? "translate-y-full"
            : isOpening
              ? "translate-y-full"
              : "translate-y-0"
        } transition-transform duration-300`}
      >
        <BottomSheetTitle
          type={type}
          status={status}
          title={formData.title}
          onChange={handleChangeTitle}
        />
        {type !== "memo" && (
          <BottomSheetInput
            type="time"
            isDisabled={status === "read"}
            startTime={formData.startTime}
            endTime={formData.endTime}
          />
        )}
        <BottomSheetInput
          type="memo"
          isDisabled={status === "read"}
          value={formData.memo}
        />
        {/* {type !== "memo" && type !== "move" && (
          <BottomSheetInput
            type="spend"
            isDisabled={status === "read"}
            value={formData.spend}
          />
        )} */}
        {(type === "place" || type === "customPlace") && (
          <BottomSheetInput
            type="place"
            isDisabled={status === "read"}
            value={formData.place}
          />
        )}
        {type === "memo" && (
          <BottomSheetCheckList
            type={type}
            status={status}
            checkList={checkList}
            setCheckList={setCheckList}
          />
        )}
        {type !== "memo" && (
          <BottomSheetImages
            type={type}
            status={status}
            images={images}
            addImage={handleAddImage}
          />
        )}

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

export default BottomSheet;
