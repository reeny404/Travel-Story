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
          icon={ICON.bookmark.on}
          size={20}
          onClick={() => addBookmark.mutate()}
        />
      ) : (
        <Icon
          icon={ICON.bookmark.off}
          size={20}
          onClick={() => deleteBookmark.mutate()}
        />
      )}
    </>
  );
}

export default BookmarkButton;
