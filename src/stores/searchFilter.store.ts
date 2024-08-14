import { create } from "zustand";
import { persist } from "zustand/middleware";

type CountryFilterType = {
  countryFilter: {
    id: number | null;
    name: string;
  };
  setCountryFilter: (id: number, name: string) => void;
  resetCountryFilter: () => void;
};

const useCountryFilterStore = create<CountryFilterType>()(
  persist(
    (set) => ({
      countryFilter: { id: null, name: "" },
      setCountryFilter: (id, name) => set({ countryFilter: { id, name } }),
      resetCountryFilter: () => set({ countryFilter: { id: null, name: "" } }),
    }),
    {
      name: "countryFilter",
    }
  )
);

export default useCountryFilterStore;
