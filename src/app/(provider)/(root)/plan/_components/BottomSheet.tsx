type BottomSheetType = {
  type: string;
  status: string;
};

/* type: customePlace, place, move, memo  status: add, read, update */
function BottomSheet({ type, status }: BottomSheetType) {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <div className="absolute bottom-0 left-0 w-full h-auto py-5 px-3 rounded-t-lg  bg-black"></div>
    </div>
  );
}

export default BottomSheet;
