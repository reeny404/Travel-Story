import { create } from "zustand";

type PathStoreProps = {
  prevPath: string;
  currentPath: string;
  setPrevPath: (value: string) => void;
  setCurrentPath: (value: string) => void;
};

export const usePathStore = create<PathStoreProps>((set) => ({
  prevPath: "/",
  currentPath: "/",
  setPrevPath: (path) => set({ prevPath: path }),
  setCurrentPath: (path) => set({ currentPath: path }),
}));
