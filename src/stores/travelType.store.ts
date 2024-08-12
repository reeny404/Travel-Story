import { create } from "zustand";

type TravelTypeStore = {
  country: number;
  travelMate: number;
  setCountry: (value: number) => void;
  setTravelMate: (value: number) => void;
};

export const useTravelType = create<TravelTypeStore>((set) => ({
  country: 0,
  travelMate: 0,
  setCountry: (value) => set({ country: value }),
  setTravelMate: (value) => set({ travelMate: value }),
}));
