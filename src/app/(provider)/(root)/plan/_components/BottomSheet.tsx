"use client";
import { BottomSheetType } from "@/types/plan";
import BottomSheetInput from "./BottomSheetInput";
import BottomSheetTitle from "./BottomSheetTitle";

function BottomSheet({ type, status }: BottomSheetType) {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <form className="absolute bottom-0 left-0 w-full h-auto py-4 pb-8 px-4 flex flex-col gap-3 rounded-t-lg shadow-bottom-sheet">
        <BottomSheetTitle type={type} status={status} />
        <BottomSheetInput
          type="time"
          isDisabled={status === "read" ? true : false}
        />
        <BottomSheetInput
          type="memo"
          isDisabled={status === "read" ? true : false}
        />
        <BottomSheetInput
          type="spend"
          isDisabled={status === "read" ? true : false}
        />
        <BottomSheetInput
          type="place"
          isDisabled={status === "read" ? true : false}
        />
      </form>
    </div>
  );
}

export default BottomSheet;
