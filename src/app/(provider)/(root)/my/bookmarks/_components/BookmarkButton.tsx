"use client";

import Icon from "@/components/commons/Icon";
import { ICON } from "@/constants/icon";
import { useBookmarks } from "@/hooks/useBookmark";

type BookmarkButtonProps = {
  areaId: number;
};

function BookmarkButton({ areaId }: BookmarkButtonProps) {
  const { isBookmarked, addBookmark, deleteBookmark } = useBookmarks();

  return (
    <>
      {isBookmarked(areaId) ? (
        <Icon
          icon={ICON.bookmark.big.on}
          size={20}
          onClick={() => deleteBookmark.mutate(areaId)}
        />
      ) : (
        <Icon
          icon={ICON.bookmark.big.off}
          size={20}
          onClick={() => addBookmark.mutate(areaId)}
        />
      )}
    </>
  );
}

export default BookmarkButton;
