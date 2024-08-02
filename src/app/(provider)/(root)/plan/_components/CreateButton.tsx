import Icon from "@/components/commons/Icon";
import { ICON } from "@/constants/icon";
import { IconType } from "@/types/Icon";

type Props = {
  icon?: IconType;
  onClick: () => void;
};

function CreateButton({ icon = ICON.add.white, onClick }: Props) {
  return (
    <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full hover:brightness-110">
      <Icon icon={icon} size={20} onClick={onClick} />
    </div>
  );
}

export default CreateButton;
