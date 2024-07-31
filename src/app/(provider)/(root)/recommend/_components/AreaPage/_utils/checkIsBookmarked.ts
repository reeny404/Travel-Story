import { AreaBookmark } from "@/types/Recommend";

export const checkIsBookmarked = (
  bookmarks: AreaBookmark[],
  areaId: number
): boolean => {
  return bookmarks.some((bookmark) => bookmark.areaId === areaId);
};
