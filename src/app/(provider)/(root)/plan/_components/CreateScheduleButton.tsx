"use client";

import clsx from "clsx";
import { useState } from "react";
import CreateButton from "./CreateButton";
import IconAdd from "./icons/IconAdd";
import IconBookmark from "./icons/IconBookmark";
import IconCar from "./icons/IconCar";
import IconCheck from "./icons/IconCheck";
import IconPin from "./icons/IconPin";

type Props = {
  createSchedule: () => void;
  createMoveSchedule: () => void;
  createMemo: () => void;
  pathTocreateByBookmark: string;
};

function CreateScheduleButton({
  createSchedule,
  createMoveSchedule,
  createMemo,
  pathTocreateByBookmark,
}: Props) {
  const [isShowButtons, setIsShowButtons] = useState<Boolean>(false);
  const onClick = () => setIsShowButtons((isShow) => !isShow);
  const buttonHoverColor = { bg: "hover:!bg-white", icon: "" };

  return (
    <div className="w-full relative flex justify-end pr-4">
      <div
        className={clsx(
          "fixed bottom-10 flex flex-col space-y-3 transition-[height] overflow-hidden",
          isShowButtons ? "h-[260px]" : "h-0"
        )}
      >
        <CreateButton
          Icon={IconBookmark}
          href={pathTocreateByBookmark}
          color={buttonHoverColor}
        />
        <CreateButton
          Icon={IconPin}
          onClick={createSchedule}
          color={buttonHoverColor}
        />
        <CreateButton
          Icon={IconCar}
          onClick={createMoveSchedule}
          color={buttonHoverColor}
        />
        <CreateButton
          Icon={IconCheck}
          onClick={createMemo}
          color={buttonHoverColor}
        />
      </div>
      <div className="fixed bottom-3">
        <CreateButton
          Icon={IconAdd}
          onClick={onClick}
          color={
            isShowButtons
              ? {
                  bg: "!bg-white hover:brightness-95",
                  icon: "group-hover:!text-black",
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}

export default CreateScheduleButton;
