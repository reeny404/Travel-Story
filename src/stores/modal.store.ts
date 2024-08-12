import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  title?: string;
  content: string;
  nextUrl?: string;
  setNextUrl: (nextUrl: string) => void;
  openModal: (content: string) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: "",
  content: "",
  nextUrl: "/",
  setNextUrl: (nextUrl: string) => set({ nextUrl }),
  openModal: (content: string) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: "" }),
}));
