import CreateButton from "./CreateButton";
import IconAdd from "./icons/IconAdd";

type Props = {
  onClick?: () => void;
};

function CreatePlanButton({ onClick }: Props) {
  return (
    <div className="w-full relative flex justify-end pr-4">
      <div className="fixed bottom-3">
        <CreateButton Icon={IconAdd} onClick={onClick} />
      </div>
    </div>
  );
}

export default CreatePlanButton;
