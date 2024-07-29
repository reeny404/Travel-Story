"use client";
import { BottomSheetType } from "@/types/plan";
import { useState } from "react";
import PlusIcon from "./PlusIcon";

function BottomSheetCheckList({ status }: BottomSheetType) {
  const [checkList, setCheckList] = useState([
    { text: "사진 찍기", isCheck: false },
  ]);

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
    <div className="flex">
      <i className="mr-2 w-8 text-center">✔❌</i>
      <ul>
        {checkList.map((item, index) => (
          <li key={index} className="flex items-center mb-2">
            {status === "read" ? (
              <p className="mr-2">{item.text}</p>
            ) : (
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                className="mr-2 border-b border-gray-300 focus:outline-none"
              />
            )}
            <button
              className={`w-12 h-12 border border-[1px] border-gray-300 ${
                item.isCheck && "bg-blue"
              }`}
              onClick={() => handleCheck(index)}
              disabled={status === "read"}
            >
              ✔
            </button>
          </li>
        ))}
        {status !== "read" && (
          <li>
            <button
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
