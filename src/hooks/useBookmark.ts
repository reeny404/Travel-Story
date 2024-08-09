import { api } from "@/apis/api";
import { AreaBookmark, RecommendResponse } from "@/types/Recommend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useBookmarks = ({ areaId }: { areaId: number }) => {
  const queryClient = useQueryClient();
  const { data: bookmarks, refetch } = useQuery<
    RecommendResponse<AreaBookmark[]>,
    AxiosError,
    AreaBookmark[]
  >({
    queryKey: ["bookmarks", areaId],
    queryFn: () => api.bookmark.getBookmarks(),
    select: (data) => data.data,
  });
  const addBookmark = useMutation({
    mutationFn: (bookmarkAreaId: number) =>
      api.bookmark.addBookmark({
        areaId: bookmarkAreaId,
      }),
    onMutate: async (newBookmark) => {
      await queryClient.cancelQueries({ queryKey: ["bookmarks", newBookmark] });

      const previousBookmarks = queryClient.getQueryData([
        "bookmarks",
        newBookmark,
      ]) as RecommendResponse<AreaBookmark>;
      const prevBookmarkData = previousBookmarks;
      // 임시로 값 생성
      const newBookmarkData = {
        area: {
          cityId: 1, // 임시로 설정한 도시 ID
          countryId: 1, // 임시로 설정한 국가 ID
          createdAt: new Date().toISOString(), // 현재 시간을 사용
          description: "임시 설명입니다.", // 임시 설명
          id: newBookmark, // areaId를 사용하여 임시 ID 설정
          imageUrl: "https://example.com/placeholder.jpg", // 임시 이미지 URL
          info: {
            notes: "임시 노트입니다.",
            address: "임시 주소입니다.",
            location: [0, 0], // 임시 위치 정보
            phoneNumber: "+00 000 000 000", // 임시 전화번호
            opening_hours: {}, // 임시 영업 시간 정보
          },
        },
        areaId: newBookmark,
        createdAt: new Date().toISOString(),
        id: Date.now(),
        lat: 0,
        lng: 0,
        userId: "임시 유저 ID",
      };
      queryClient.setQueryData(
        ["bookmarks", newBookmark],
        (oldBookmarks: RecommendResponse<AreaBookmark[]>) => {
          const { data } = oldBookmarks;
          return {
            ...oldBookmarks,
            data: [...data, newBookmarkData],
          };
        }
      );
      return { previousBookmarks };
    },
    onError: (err, newBookmark, context) => {
      queryClient.setQueryData(
        ["bookmarks", newBookmark],
        context?.previousBookmarks
      );
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", data[0].areaId],
      });
    },
  });
  const deleteBookmark = useMutation({
    mutationFn: async (bookmarkAreaId: number) => {
      return await api.bookmark.deleteBookmark({
        areaId: bookmarkAreaId,
      });
    },
    onMutate: async (newBookmark) => {
      await queryClient.cancelQueries({ queryKey: ["bookmarks", newBookmark] });
      const previousBookmarks = queryClient.getQueryData([
        "bookmarks",
        newBookmark,
      ]) as RecommendResponse<AreaBookmark>;

      const prevBookmarkData = previousBookmarks?.data;
      queryClient.setQueryData(
        ["bookmarks", newBookmark],
        (old: RecommendResponse<AreaBookmark[]>) => {
          const oldBookmarks = old.data;

          const filteredOldBookmarks = oldBookmarks.filter(
            (oldBookmark) => oldBookmark.areaId !== newBookmark
          );
          return filteredOldBookmarks;
        }
      );
      return { prevBookmarkData };
    },
    onError: (err, newBookmark, context) => {
      queryClient.setQueryData(
        ["bookmarks", newBookmark],
        context?.prevBookmarkData
      );
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", data[0].areaId],
      });
    },
  });
  const isBookmarked = bookmarks?.some(
    (bookmark) => bookmark.areaId === areaId
  );

  return { isBookmarked, addBookmark, deleteBookmark };
};
