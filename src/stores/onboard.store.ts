import { create } from "zustand";

type OnboardStoreProps = {
  progress: number;
  isInputValid: boolean;
  isSelectedOne: number;
  isSelectedMany: number[];
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
  setProgress: (isUp) =>
    set((state) => ({
      progress: isUp ? state.progress + 1 : state.progress - 1,
    })),
  setIsInputValid: (state) => set({ isInputValid: state }),
  setIsSelectedOne: (state) => set({ isSelectedOne: state }),
  setSelectedMany: (state) => set({ isSelectedMany: state }),
}));
