import { create } from "zustand";

type RecommendStore = {
  cityId: number;
  setCityId: (cityId: number) => void;
  countryId: number;
};

const useRecommendStore = create<RecommendStore>((set) => ({
  cityId: 1,
  countryId: 1,
  setCityId: (cityId: number) => set((state) => ({ cityId })),
}));

export default useRecommendStore;
