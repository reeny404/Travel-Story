import SubmitButton from "@/components/commons/SubmitButton";
import SvgIcon from "@/components/commons/SvgIcon";
import { COUNTRY_LIST } from "@/constants/country";

function FilterButton({ country }: { country: string }) {
  return (
    <button className="p-4 rounded-lg shadow-search" type="button">
      {country}
    </button>
  );
}

type SearchFilterProps = {
  onClose: () => void;
};

function SearchFilter({ onClose }: SearchFilterProps) {
  return (
    <aside className="fixed top-0 max-w-xs w-full h-full bg-white shadow-drawer z-drawer transform transition-transform duration-500 ease-in-out">
      <header className="flex justify-end items-center px-4">
        <h2 className="absolute left-1/2 transform -translate-x-1/2 font-medium">
          국가 필터
        </h2>
        <div className="flex justify-end items-center w-11 h-11">
          <SvgIcon
            name="x"
            width={20}
            height={20}
            title="cancel"
            onClick={onClose}
          />
        </div>
      </header>

      <section className="flex flex-col justify-center items-start px-4 pt-4 py-[21px]">
        <h3 className="flex-1 text-[28px] font-bold leading-9 mt-[56px] mb-[64px]">
          검색 결과에서
          <br />
          선택한 나라만 보여드려요.
        </h3>
        <div className="flex-1 w-full mb-[38px] overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-2 gap-4 w-full h-full">
            {COUNTRY_LIST.map((country) => (
              <FilterButton key={country.id} country={country.krName} />
            ))}
          </div>
        </div>
        <SubmitButton theme="primary" size="full" className="flex-none">
          선택 완료
        </SubmitButton>
      </section>
    </aside>
  );
}

export default SearchFilter;
