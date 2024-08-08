"use client";

import Icon from "@/components/commons/Icon";
import { ICON } from "@/constants/icon";
import { useBookmarks } from "@/hooks/useBookmark";

type BookmarkButtonProps = {
  areaId: number;
};

function BookmarkButton({ areaId }: BookmarkButtonProps) {
  const { isBookmarked, addBookmark, deleteBookmark } = useBookmarks(areaId);

  return (
    <>
      {isBookmarked ? (
        <Icon
          icon={ICON.bookmark.big.on}
          size={20}
          onClick={() => deleteBookmark.mutate()}
        />
      ) : (
        <Icon
          icon={ICON.bookmark.big.off}
          size={20}
          onClick={() => addBookmark.mutate()}
        />
      )}
    </>
  );
}

export default BookmarkButton;
