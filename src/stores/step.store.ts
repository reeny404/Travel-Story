import { create } from "zustand";

type StepStoreProps = {
  step: string;
  labelText: string;
  labelColor: string;
  isInputValid: boolean;
  nextURL: string;
  setStep: (value: string) => void;
  setLabelText: (value: string) => void;
  setLabelColor: (value: string) => void;
  setIsInputValid: (value: boolean) => void;
  setNextURL: (value: string) => void;
};

export const useLoginStepStore = create<StepStoreProps>((set) => ({
  step: "email",
  labelText: "",
  labelColor: "black",
  isInputValid: true,
  nextURL: "/",
  setStep: (nextStep) => set({ step: nextStep }),
  setLabelColor: (nextLabel) => set({ labelColor: nextLabel }),
  setLabelText: (nextText) => set({ labelText: nextText }),
  setIsInputValid: (state) => set({ isInputValid: state }),
  setNextURL: (state) => set({ nextURL: state }),
}));
