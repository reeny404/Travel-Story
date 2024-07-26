import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type RecommendStore = {
  cityId: number;
  setCityId: (cityId: number) => void;
  countryId: number;
  setCountryId: (countryId: number) => void;
};

type MyPersist = (
  config: (set: any, get: any, api: any) => RecommendStore,
  options: PersistOptions<RecommendStore>
) => (set: any, get: any, api: any) => RecommendStore;

const useRecommendStore = create<RecommendStore>(
  (persist as MyPersist)(
    (set) => ({
      cityId: 1,
      countryId: 1,
      setCityId: (cityId: number) => set({ cityId }),
      setCountryId: (countryId: number) => set({ countryId }),
    }),
    {
      name: "recommend-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useRecommendStore;
