import { create } from "zustand";

type DrawerStoreType = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const useDrawerStore = create<DrawerStoreType>((set) => ({
  isOpen: false,
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
}));

export default useDrawerStore;
