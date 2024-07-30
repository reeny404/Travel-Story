import { create } from "zustand";

type StepStoreProps = {
  step: string;
  labelText: string;
  labelColor: string;
  setStep: (value: string) => void;
  setLabelText: (value: string) => void;
  setLabelColor: (value: string) => void;
};

export const useStepStore = create<StepStoreProps>((set) => ({
  step: "email",
  labelText: "",
  labelColor: "black",
  setStep: (nextStep) => set({ step: nextStep }),
  setLabelColor: (nextLabel) => set({ labelColor: nextLabel }),
  setLabelText: (nextText) => set({ labelText: nextText }),
}));
