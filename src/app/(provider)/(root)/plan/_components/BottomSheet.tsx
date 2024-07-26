"use client";
import { BottomSheetType } from "@/types/plan";
import BottomSheetInput from "./BottomSheetInput";
import BottomSheetTitle from "./BottomSheetTitle";

function BottomSheet({ type, status }: BottomSheetType) {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <div className="absolute bottom-0 left-0 w-full h-auto py-4 pb-8 px-4 flex flex-col gap-3 rounded-t-lg shadow-bottom-sheet">
        <BottomSheetTitle type={type} status={status} />
        <BottomSheetInput type="memo" />
        <BottomSheetInput type="spend" />
        <BottomSheetInput type="place" />
      </div>
    </div>
  );
}

export default BottomSheet;
