import { create } from "zustand";

type OnboardStoreProps = {
  progress: number;
  isInputValid: boolean;
  isSelectedOne: number;
  isSelectedMany: number[];
  country: number;
  travelMate: number;
  setCountry: (value: number) => void;
  setTravelMate: (value: number) => void;
  setProgress: (value: boolean) => void;
  setIsInputValid: (value: boolean) => void;
  setIsSelectedOne: (value: number) => void;
  setSelectedMany: (value: number[]) => void;
};

export const useOnboardStore = create<OnboardStoreProps>((set) => ({
  progress: 1,
  isInputValid: true,
  isSelectedOne: 0,
  isSelectedMany: [],
  country: 0,
  travelMate: 0,
  setCountry: (value) => set({ country: value }),
  setTravelMate: (value) => set({ travelMate: value }),
  setProgress: (isUp) =>
    set((state) => ({
      progress: isUp ? state.progress + 1 : state.progress - 1,
    })),
  setIsInputValid: (state) => set({ isInputValid: state }),
  setIsSelectedOne: (state) => set({ isSelectedOne: state }),
  setSelectedMany: (state) => set({ isSelectedMany: state }),
}));
