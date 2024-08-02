"use client";

import Icon from "@/components/commons/Icon";
import { ICON } from "@/constants/icon";
import { IconType } from "@/types/Icon";
import clsx from "clsx";
import { useState } from "react";

type Props = {
  createSchedule: () => void;
  createMemo: () => void;
  createByBookmark: () => void;
};

function CreateButton({ createSchedule, createMemo, createByBookmark }: Props) {
  const [isShowButtons, setIsShowButtons] = useState<Boolean>(false);
  const onClick = () => setIsShowButtons((isShow) => !isShow);

  return (
    <div className="w-full relative flex justify-end pr-4">
      <div
        className={clsx(
          "fixed bottom-11 flex flex-col space-y-3 transition-[height] overflow-hidden",
          isShowButtons ? "h-[200px]" : "h-0"
        )}
      >
        <Button icon={ICON.bookmark.big.off} onClick={createByBookmark} />
        <Button icon={ICON.maker.gray} onClick={createSchedule} />
        <Button icon={ICON.calendar.white} onClick={createMemo} />
      </div>
      <div className="fixed bottom-4">
        <Button icon={ICON.add.white} onClick={onClick} />
      </div>
    </div>
  );
}

type BlueButtonProps = {
  icon: IconType;
  onClick: () => void;
};

function Button({ icon, onClick }: BlueButtonProps) {
  return (
    <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full hover:brightness-110">
      <Icon icon={icon} size={24} onClick={onClick} />
    </div>
  );
}

export default CreateButton;
