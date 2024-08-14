import Image from "next/image";

type FilterButtonProps = {
  country: string;
  countryFlag: string;
  isSelected: boolean;
  onClick: () => void;
};

function FilterButton({
  country,
  countryFlag,
  isSelected,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      className={`flex items-center max-h-[69.6px] h-full p-4 gap-3 rounded-lg shadow-search ${
        isSelected
          ? "border border-brand-600 bg-gradient-to-t from-brand-200"
          : "border bg-transparent"
      }`}
      type="button"
      onClick={onClick}
    >
      <div className="relative max-w-8 w-full max-h-8 h-full rounded-full bg-neutral-200 border border-neutral-100 overflow-hidden">
        <Image src={countryFlag} alt={country} fill className="object-cover" />
      </div>
      <h3 className="text-start text-lg font-semibold line-clamp-2 text-ellipsis">
        {country}
      </h3>
    </button>
  );
}

export default FilterButton;
