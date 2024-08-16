import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type RecentStoreProps = {
  recentSearch: Array<{ search: string; date: string }>;
  recentArea: number[];
  setRecentSearch: (value: Array<{ search: string; date: string }>) => void;
  setRecentArea: (value: number[]) => void;
};

export const useRecentStore = create<RecentStoreProps>()(
  immer((set) => ({
    recentSearch: [],
    recentArea: [],
    setRecentSearch: (value) =>
      set((state) => {
        state.recentSearch = value;
      }),
    setRecentArea: (value) =>
      set((state) => {
        state.recentArea = [...value];
      }),
  }))
);
