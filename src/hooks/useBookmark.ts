import { api } from "@/apis/api";
import { AreaBookmark, RecommendResponse } from "@/types/Recommend";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const userId = "80bf108c-63c1-43ce-b463-92b9a0915f0d";

export const useBookmarks = (areaId: number) => {
  const { data: bookmarks, refetch } = useQuery<
    RecommendResponse<AreaBookmark[]>,
    AxiosError,
    AreaBookmark[]
  >({
    queryKey: ["bookmarks", userId],
    queryFn: () => api.bookmark.getBookmarks(userId),
    select: (data) => data.data,
  });

  const addBookmark = useMutation({
    mutationFn: () =>
      api.bookmark.addBookmark({
        userId,
        areaId,
      }),
    onSuccess: () => refetch(), // 성공 시 북마크 목록 갱신
  });

  const deleteBookmark = useMutation({
    mutationFn: () =>
      api.bookmark.deleteBookmark({
        userId,
        areaId,
      }),
    onSuccess: () => refetch(), // 성공 시 북마크 목록 갱신
  });

  const isBookmarked = bookmarks?.some(
    (bookmark) => bookmark.areaId === areaId
  );

  return { isBookmarked, addBookmark, deleteBookmark };
};
