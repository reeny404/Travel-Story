"use client";

import SvgIcon from "@/components/commons/SvgIcon";
import { useOverlay } from "@/contexts/overlay.context";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

function PlanEllipsisButton({ planId }: { planId: string }) {
  const { show: showOverlay } = useOverlay();
  const handleDeletePlan = () => {};

  return (
    <Menu>
      <MenuButton
        className="w-5"
        onClick={(e) => {
          e.stopPropagation();
          showOverlay();
        }}
      >
        <SvgIcon name="ellipsis" width={16} height={16} />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="w-24 rounded-md bg-white text-sm z-40"
      >
        <MenuItem>
          <button
            className="w-full px-3 pt-2 pb-1 flex items-center hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              alert("구현 중입니다.");
            }}
          >
            수정하기
          </button>
        </MenuItem>
        <MenuItem>
          <button
            className="w-full px-3 pt-1 pb-2 flex items-center hover:bg-gray-100"
            onClick={handleDeletePlan}
          >
            삭제하기
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default PlanEllipsisButton;
