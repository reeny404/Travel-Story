"use client";
import { BottomSheetType } from "@/types/plan";
import PlusIcon from "./PlusIcon";

import { useEffect, useState } from "react";
import CheckIcon from "./icons/CheckIcon";

type CheckListProps = {
  type: BottomSheetType["type"];
  status: BottomSheetType["status"];
  checkList: { text: string; isCheck: boolean }[];
  setCheckList: (checkList: { text: string; isCheck: boolean }[]) => void;
};

function BottomSheetCheckList({
  type,
  status,
  checkList: initialCheckList,
  setCheckList,
}: CheckListProps) {
  const [checkList, updateCheckList] = useState(initialCheckList);
  useEffect(() => {
    updateCheckList(initialCheckList);
  }, [initialCheckList]);

  const handleCheck = (index: number) => {
    const newCheckList = [...checkList];
    newCheckList[index].isCheck = !newCheckList[index].isCheck;
    setCheckList(newCheckList);
  };

  const handleTextChange = (index: number, newText: string) => {
    const newCheckList = [...checkList];
    newCheckList[index].text = newText;
    setCheckList(newCheckList);
  };

  const handleAddTask = () => {
    setCheckList([...checkList, { text: "", isCheck: false }]);
  };

  return (
    <div className="flex w-full">
      <i className="mr-2 w-8 text-center">✔</i>
      <ul className="w-full">
        {checkList.map((item, index) => (
          <li
            key={index}
            className="w-full mb-2 flex items-center justify-between "
          >
            {status === "read" ? (
              <>
                <p className="mr-2">{item.text}</p>
                <button
                  type="button"
                  className={`w-8 h-8 border-[1px] border-gray-300 ${
                    item.isCheck
                      ? "bg-blue-500 text-white border-0"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleCheck(index)}
                >
                  ✔
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                  className="mr-2 border-b border-gray-300 focus:outline-none"
                  placeholder="할 일"
                />
                <button
                  type="button"
                  className={`w-8 h-8 border-[1px] border-gray-300 ${
                    item.isCheck
                      ? "bg-blue-500 text-white border-0"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleCheck(index)}
                >
                  <CheckIcon />
                </button>
              </>
            )}
          </li>
        ))}
        {status !== "read" && (
          <li>
            <button
              type="button"
              className="flex items-center text-gray-300"
              onClick={handleAddTask}
            >
              할 일 <PlusIcon className="text-gray-300 ml-1" />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default BottomSheetCheckList;
