import { create } from "zustand";
import { persist } from "zustand/middleware";

type RecommendStore = {
  cityId: number;
  setCityId: (cityId: number) => void;
  countryId: number;
  setCountryId: (countryId: number) => void;
};

const useRecommendStore = create<RecommendStore>()(
  persist(
    (set) => ({
      cityId: 1,
      countryId: 1,
      setCityId: (cityId: number) => set({ cityId }),
      setCountryId: (countryId: number) => set({ countryId }),
    }),
    {
      name: "recommend",
    }
  )
);

export default useRecommendStore;
