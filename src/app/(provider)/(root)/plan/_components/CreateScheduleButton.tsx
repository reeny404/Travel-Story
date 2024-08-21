"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import CreateButton from "./CreateButton";
import IconAdd from "./icons/IconAdd";
import IconBookmark from "./icons/IconBookmark";
import IconCar from "./icons/IconCar";
import IconCheck from "./icons/IconCheck";

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
          // Icon={IconBookmark}
          bg={buttonHoverColor.bg}
        >
          <Link href={pathTocreateByBookmark}>
            <IconBookmark
              className={clsx(
                "text-black group-hover:text-white",
                buttonHoverColor.icon
              )}
            />
          </Link>
        </CreateButton>
        <CreateButton bg={buttonHoverColor.bg}>
          <IconBookmark
            className={clsx(
              "text-black group-hover:text-white",
              buttonHoverColor.icon
            )}
            onClick={createSchedule}
          />
        </CreateButton>
        <CreateButton bg={buttonHoverColor.bg}>
          <IconCar
            className={clsx(
              "text-black group-hover:text-white",
              buttonHoverColor.icon
            )}
            onClick={createMoveSchedule}
          />
        </CreateButton>
        <CreateButton bg={buttonHoverColor.bg}>
          <IconCheck
            className={clsx(
              "text-black group-hover:text-white",
              buttonHoverColor.icon
            )}
            onClick={createMemo}
          />
        </CreateButton>
      </div>
      <div className="fixed bottom-3">
        <CreateButton
          bg={isShowButtons ? "!bg-white hover:brightness-95" : null}
        >
          <IconAdd
            className={clsx("text-black group-hover:text-white", {
              "group-hover:!text-black": isShowButtons,
            })}
            onClick={onClick}
          />
        </CreateButton>
      </div>
    </div>
  );
}

export default CreateScheduleButton;
