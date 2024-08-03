import create from "zustand";

type ModalState = {
  isOpen: boolean;
  title: string;
  content: string;
  openModal: (title: string, content: string) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: "",
  content: "",
  openModal: (title: string, content: string) =>
    set({ isOpen: true, title, content }),
  closeModal: () => set({ isOpen: false, title: "", content: "" }),
}));
