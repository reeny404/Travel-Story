import Link from "next/link";
import IconAdd from "./icons/IconAdd";

function CreatePlanButton() {
  return (
    <div className="w-full relative flex justify-end pr-4">
      <div className="fixed bottom-3">
        <div className="w-12 h-12 flex items-center justify-center bg-lime-300 shadow-lg rounded-full cursor-pointer group hover:bg-gray-750">
          <Link href="/plan/create">
            <IconAdd className="text-black group-hover:text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreatePlanButton;
