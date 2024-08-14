import SvgIcon from "@/components/commons/SvgIcon";
import { useOverlay } from "@/contexts/overlay.context";
import usePlanStore from "@/stores/plan.store";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

type Props = {
  planId: string;
};

function PlanEllipsisMenu({ planId }: Props) {
  const { deletePlan } = usePlanStore();
  const { show: showOverlay, hide: hideOverlay } = useOverlay();

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
            className="w-full px-3 py-2 flex items-center hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              deletePlan(planId);
              hideOverlay();
            }}
          >
            삭제하기
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default PlanEllipsisMenu;
