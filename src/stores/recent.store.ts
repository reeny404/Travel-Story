import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type RecentStoreProps = {
  recentSearch: Array<{ search: string; date: string }>;
  setRecentSearch: (value: Array<{ search: string; date: string }>) => void;
};

export const useRecentStore = create<RecentStoreProps>()(
  immer((set) => ({
    recentSearch: [],
    setRecentSearch: (value) =>
      set((state) => {
        state.recentSearch = value;
      }),
  }))
);
