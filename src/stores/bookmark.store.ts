import { AreaBookmark, extendBookmark } from "@/types/Recommend";
import { produce } from "immer";
import { create } from "zustand";

type BookmarkState = {
  bookmarks: AreaBookmark[] | null;
  fetchBookmarks: (data: extendBookmark[]) => Promise<void>;
  addBookmark: (bookmark: AreaBookmark) => void;
  deleteBookmark: (areaId: number) => void;
  checkBookmarked: (areaId: number) => boolean;
};

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: null,

  fetchBookmarks: async (data: AreaBookmark[]) => {
    set(
      produce((state: BookmarkState) => {
        if (data) {
          state.bookmarks = data;
        } else {
          state.bookmarks = [];
        }
      })
    );
  },

  addBookmark: (bookmark) =>
    set(
      produce((state: BookmarkState) => {
        if (state.bookmarks) {
          state.bookmarks.push(bookmark);
        } else {
          state.bookmarks = [bookmark];
        }
      })
    ),

  deleteBookmark: (areaId) =>
    set(
      produce((state: BookmarkState) => {
        state.bookmarks =
          state.bookmarks?.filter((bookmark) => bookmark.areaId !== areaId) ||
          null;
      })
    ),

  checkBookmarked: (areaId: number) => {
    const bookmarks = get().bookmarks;
    return bookmarks?.some((bookmark) => bookmark.areaId === areaId) ?? false;
  },
}));
