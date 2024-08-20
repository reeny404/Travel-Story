"use client";

import SubmitButton from "@/components/commons/SubmitButton";
import ModalContainer from "@/components/Modal/ModalContainer";
import { COUNTRY_LIST } from "@/constants/country";
import useCountryFilterStore from "@/stores/searchFilter.store";
import { useEffect, useState } from "react";
import { useWindowSize } from "../../_hook/useWindowSize";
import FilterButton from "./Button/FilterButton";

type SearchFilterProps = {
  onClose: () => void;
};

function SearchFilter({ onClose }: SearchFilterProps) {
  const { width } = useWindowSize();
  const { countryFilter, setCountryFilter, resetCountryFilter } =
    useCountryFilterStore();
  const [selectedCountry, setSelectedCountry] = useState<{
    id: number | null;
    name: string;
  }>({ id: null, name: "" });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (countryFilter.id) {
      setSelectedCountry({ id: countryFilter.id, name: countryFilter.name });
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [countryFilter]);

  const handleCountryClick = (id: number, name: string) => {
    setSelectedCountry((prevSelected) =>
      prevSelected.id === id ? { id: null, name: "" } : { id, name }
    );
  };

  const handleApplyFilter = () => {
    if (selectedCountry.id) {
      setCountryFilter(selectedCountry.id, selectedCountry.name);
    } else {
      resetCountryFilter();
    }
    onClose();
  };

  if (!width) {
    return null;
  }

  return (
    <ModalContainer onClose={onClose}>
      <h3 className="text-[28px] font-bold leading-9 mt-[6.9%] mb-[7.88%]">
        검색 결과에서
        <br />
        선택한 나라만 보여드려요.
      </h3>

      <div className="flex-1 w-full max-h-[412px] h-full mb-[38px] overflow-y-auto no-scrollbar">
        <div className="grid grid-cols-2 gap-4 w-full h-full">
          {COUNTRY_LIST.map((country) => (
            <FilterButton
              key={country.id}
              country={country.krName}
              countryFlag={country.imageUrl}
              isSelected={selectedCountry.id === country.id}
              onClick={() => handleCountryClick(country.id, country.krName)}
            />
          ))}
        </div>
      </div>

      <SubmitButton
        theme="primary"
        size="full"
        className="flex-none"
        onClick={handleApplyFilter}
      >
        선택 완료
      </SubmitButton>
    </ModalContainer>
  );
}
export default SearchFilter;
