import SubmitButton from "@/components/commons/SubmitButton";
import SvgIcon from "@/components/commons/SvgIcon";
import { COUNTRY_LIST } from "@/constants/country";
import { useEffect } from "react";

type FilterButtonProps = {
  country: string;
};

function FilterButton({ country }: FilterButtonProps) {
  return (
    <button
      className="max-h-[59.6px] h-full p-4 rounded-lg shadow-search"
      type="button"
    >
      {country}
    </button>
  );
}

type SearchFilterProps = {
  onClose: () => void;
};

// 전역으로 filter된 country 관리 => useCountryFilterStore
function SearchFilter({ onClose }: SearchFilterProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
            className="cursor-pointer"
          />
        </div>
      </header>

      <section className="flex flex-col justify-start items-start w-full h-[calc(100%-3rem)] px-4 pt-4 pb-[21px]">
        <h3 className="text-[28px] font-bold leading-9 mt-[6.9%] mb-[7.88%]">
          검색 결과에서
          <br />
          선택한 나라만 보여드려요.
        </h3>
        <div className="flex-1 w-full max-h-[412px] h-full mb-[38px] overflow-y-auto no-scrollbar">
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
