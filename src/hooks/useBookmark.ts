import { api } from "@/apis/api";
import { AreaBookmark, RecommendResponse } from "@/types/Recommend";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useBookmarks = (areaId: number) => {
  const { data: bookmarks, refetch } = useQuery<
    RecommendResponse<AreaBookmark[]>,
    AxiosError,
    AreaBookmark[]
  >({
    queryKey: ["bookmarks", "get"],
    queryFn: () => api.bookmark.getBookmarks(),
    select: (data) => data.data,
  });

  const addBookmark = useMutation({
    mutationFn: () =>
      api.bookmark.addBookmark({
        areaId,
      }),
    onSuccess: () => refetch(), // 성공 시 북마크 목록 갱신
  });

  const deleteBookmark = useMutation({
    mutationFn: () =>
      api.bookmark.deleteBookmark({
        areaId,
      }),
    onSuccess: () => refetch(), // 성공 시 북마크 목록 갱신
  });

  const isBookmarked = bookmarks?.some(
    (bookmark) => bookmark.areaId === areaId
  );

  return { isBookmarked, addBookmark, deleteBookmark };
};
