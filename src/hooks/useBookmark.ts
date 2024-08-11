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
    mutationFn: async (bookmarkAreaId: number) => {
      const { data } = await api.bookmark.addBookmark({
        areaId: bookmarkAreaId,
      });
      return data;
    },
    onMutate: async (newBookmark) => {
      await queryClient.cancelQueries({ queryKey: ["bookmarks", newBookmark] });

      const previousBookmarks = queryClient.getQueryData([
        "bookmarks",
        newBookmark,
      ]) as RecommendResponse<AreaBookmark[]>;

      const newBookmarkData = {
        areaId: newBookmark,
        id: Date.now(), // 임시 ID 설정
        lat: 0,
        lng: 0,
        userId: "임시 유저 ID",
        createdAt: new Date().toISOString(),
        area: {
          cityId: 1,
          countryId: 1,
          createdAt: new Date().toISOString(),
          description: "임시 설명입니다.",
          id: newBookmark,
          imageUrl: "https://example.com/placeholder.jpg",
          info: {
            notes: "임시 노트입니다.",
            address: "임시 주소입니다.",
            location: [0, 0],
            phoneNumber: "+00 000 000 000",
            opening_hours: {},
          },
        },
      };
      queryClient.setQueryData(
        ["bookmarks", newBookmark],
        (oldBookmarks: RecommendResponse<AreaBookmark[]>) => {
          const { data } = oldBookmarks || { data: [] };

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
      console.log("data", data);
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", data.areaId],
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
    onSettled: ({ data }: any) => {
      console.log("data", data);
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", data.areaId],
      });
    },
  });
  console.log("bookmarks", bookmarks);
  const isBookmarked = bookmarks?.some(
    (bookmark) => bookmark.areaId === areaId
  );

  return { isBookmarked, addBookmark, deleteBookmark };
};
