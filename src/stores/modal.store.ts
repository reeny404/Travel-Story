import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  title?: string;
  content: string;
  openModal: (content: string) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: "",
  content: "",
  openModal: (content: string) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: "" }),
}));
