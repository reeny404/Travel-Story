import SvgIcon from "@/components/commons/SvgIcon";

function BottomSheetTitle({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <h1 className="w-full h-auto flex md:justify-between items-center text-xl bg-white text-neutral-750 font-semibold leading-6">
      {title}
      <button onClick={onClose} className="hidden md:block">
        <SvgIcon
          name="cancel"
          width={20}
          height={20}
          color="neutral-750"
          title="cancel"
          hasStroke={true}
        />
      </button>
    </h1>
  );
}

export default BottomSheetTitle;
