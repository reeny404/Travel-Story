"use client";

import { ICON } from "@/constants/icon";
import clsx from "clsx";
import { useState } from "react";
import CreateButton from "./CreateButton";

type Props = {
  createSchedule: () => void;
  createMoveSchedule: () => void;
  createMemo: () => void;
  createByBookmark: () => void;
};

function CreateScheduleButton({
  createSchedule,
  createMoveSchedule,
  createMemo,
  createByBookmark,
}: Props) {
  const [isShowButtons, setIsShowButtons] = useState<Boolean>(false);
  const onClick = () => setIsShowButtons((isShow) => !isShow);

  return (
    <div className="w-full relative flex justify-end pr-4">
      <div
        className={clsx(
          "fixed bottom-11 flex flex-col space-y-3 transition-[height] overflow-hidden",
          isShowButtons ? "h-[260px]" : "h-0"
        )}
      >
        <CreateButton
          icon={ICON.bookmark.big.white}
          onClick={createByBookmark}
        />
        <CreateButton icon={ICON.location.white} onClick={createSchedule} />
        <CreateButton icon={ICON.car.white} onClick={createMoveSchedule} />
        <CreateButton icon={ICON.checkmark.white} onClick={createMemo} />
      </div>
      <div className="fixed bottom-4">
        <CreateButton onClick={onClick} />
      </div>
    </div>
  );
}

export default CreateScheduleButton;
