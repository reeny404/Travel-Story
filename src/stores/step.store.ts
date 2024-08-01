import { create } from "zustand";

type StepStoreProps = {
  step: string;
  labelText: string;
  labelColor: string;
  isInputValid: boolean;
  setStep: (value: string) => void;
  setLabelText: (value: string) => void;
  setLabelColor: (value: string) => void;
  setIsInputValid: (value: boolean) => void;
};

export const useLoginStepStore = create<StepStoreProps>((set) => ({
  step: "email",
  labelText: "",
  labelColor: "black",
  isInputValid: true,
  setStep: (nextStep) => set({ step: nextStep }),
  setLabelColor: (nextLabel) => set({ labelColor: nextLabel }),
  setLabelText: (nextText) => set({ labelText: nextText }),
  setIsInputValid: (state) => set({ isInputValid: state }),
}));
