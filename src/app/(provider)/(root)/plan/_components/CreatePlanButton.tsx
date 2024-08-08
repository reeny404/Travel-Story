"use client";

import CreateButton from "./CreateButton";
import IconAdd from "./icons/IconAdd";

function CreatePlanButton() {
  return (
    <div className="w-full relative flex justify-end pr-4">
      <div className="fixed bottom-3">
        <CreateButton Icon={IconAdd} href="/plan/create" />
      </div>
    </div>
  );
}

export default CreatePlanButton;
