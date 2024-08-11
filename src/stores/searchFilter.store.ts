import { create } from "zustand";
import { persist } from "zustand/middleware";

type CountryFilterType = {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  resetSelectedCountry: () => void;
};

const useCountryFilterStore = create<CountryFilterType>()(
  persist(
    (set) => ({
      selectedCountry: "",
      setSelectedCountry: (country) => set({ selectedCountry: country }),
      resetSelectedCountry: () => set({ selectedCountry: "" }),
    }),
    {
      name: "filteredCountry",
    }
  )
);

export default useCountryFilterStore;
