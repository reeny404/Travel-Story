import { ICON } from "@/constants/icon";
import CreateButton from "./CreateButton";

type Props = {
  onClick?: () => void;
};

function CreatePlanButton({ onClick }: Props) {
  return (
    <div className="w-full relative flex justify-end pr-4">
      <div className="fixed bottom-4">
        <CreateButton icon={ICON.add.white} onClick={onClick} />
      </div>
    </div>
  );
}

export default CreatePlanButton;
