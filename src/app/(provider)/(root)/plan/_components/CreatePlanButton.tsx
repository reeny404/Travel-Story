import Link from "next/link";
import IconAdd from "./icons/IconAdd";

function CreatePlanButton() {
  return (
    <div className="w-full relative flex justify-end pr-4 z-10">
      <div className="fixed bottom-3">
        <Link href="/plan/create">
          <div className="w-12 h-12 flex items-center justify-center bg-lime-300 shadow-lg rounded-full cursor-pointer group hover:bg-gray-750">
            <IconAdd className="text-black group-hover:text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CreatePlanButton;
