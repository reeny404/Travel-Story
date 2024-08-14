function BottomSheetTitle({ title }: { title: string }) {
  return (
    <h1 className="w-full h-auto flex items-center text-xl bg-white text-neutral-750 font-semibold leading-6">
      {title}
    </h1>
  );
}

export default BottomSheetTitle;
