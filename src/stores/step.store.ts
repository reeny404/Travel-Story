import { create } from "zustand";

type StepStoreProps = {
  progress: number;
  labelText: string;
  labelColor: string;
  isInputValid: boolean;
  nextURL: string;
  setProgress: (value: boolean) => void;
  setProgressInit: () => void;
  setLabelText: (value: string) => void;
  setLabelColor: (value: string) => void;
  setIsInputValid: (value: boolean) => void;
  setNextURL: (value: string) => void;
};

export const useLoginStepStore = create<StepStoreProps>((set) => ({
  progress: 0,
  labelText: "",
  labelColor: "black",
  isInputValid: true,
  nextURL: "/",
  setProgress: (isUp) =>
    set((state) => ({
      progress: isUp ? state.progress + 1 : state.progress - 1,
    })),
  setProgressInit: () => set({ progress: 0 }),
  setLabelColor: (nextLabel) => set({ labelColor: nextLabel }),
  setLabelText: (nextText) => set({ labelText: nextText }),
  setIsInputValid: (state) => set({ isInputValid: state }),
  setNextURL: (state) => set({ nextURL: state }),
}));
