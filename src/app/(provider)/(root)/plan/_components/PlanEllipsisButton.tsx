import { api } from "@/apis/api";
import SvgIcon from "@/components/commons/SvgIcon";
import { useOverlay } from "@/contexts/overlay.context";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MouseEventHandler } from "react";

type Props = {
  planId: string;
  // onDelete: () => void;
};

function PlanEllipsisMenu({ planId }: Props) {
  const { show: showOverlay } = useOverlay();
  const handleDeletePlan: MouseEventHandler = (e) => {
    e.stopPropagation();
    api.plan.delete(planId).then((data) => {
      console.log("삭제완료!!", data);
      // onDelete();
    });
  };

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

export default PlanEllipsisMenu;
