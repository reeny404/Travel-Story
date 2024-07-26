import { create } from "zustand";
import { persist } from "zustand/middleware";

type RecommendStore = {
  cityId: number;
  countryId: number;
  currentTab: string;
  setCityId: (cityId: number) => void;
  setCountryId: (countryId: number) => void;
  setCurrentTab: (currentTab: string) => void;
};

const useRecommendStore = create<RecommendStore>()(
  persist(
    (set) => ({
      cityId: 1,
      countryId: 1,
      currentTab: "acommodation",
      setCityId: (cityId: number) => set({ cityId }),
      setCountryId: (countryId: number) => set({ countryId }),
      setCurrentTab: (currentTab: string) => set({ currentTab }),
    }),
    {
      name: "recommend",
    }
  )
);

export default useRecommendStore;
