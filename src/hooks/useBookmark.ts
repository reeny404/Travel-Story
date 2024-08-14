import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { AreaBookmark, RecommendResponse } from "@/types/Recommend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useBookmarks = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: bookmarks, refetch } = useQuery<
    RecommendResponse<AreaBookmark[]>,
    AxiosError,
    AreaBookmark[]
  >({
    queryKey: ["bookmarks", user?.id],
    queryFn: async () => {
      const data = await api.bookmark.getBookmarks();
      return data;
    },
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
      await queryClient.cancelQueries({ queryKey: ["bookmarks", user?.id] });

      let previousBookmarks = queryClient.getQueryData([
        "bookmarks",
        user?.id,
      ]) as RecommendResponse<AreaBookmark[]>;
      if (previousBookmarks.message === "No Data") {
        previousBookmarks = {
          status: 200,
          message: "Success",
          data: [],
          error: null,
        };
      }
      const newBookmarkData = {
        areaId: newBookmark,
        id: Date.now(),
        lat: 0,
        lng: 0,
        userId: user?.id,
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
        ["bookmarks", user?.id],
        (oldBookmarks: RecommendResponse<AreaBookmark[]>) => {
          const { data } = oldBookmarks;
          if ((oldBookmarks.status = 404)) {
            return {
              status: 200,
              message: "Success",
              data: [newBookmarkData],
              error: null,
            };
          }
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
        ["bookmarks", user?.id],
        context?.previousBookmarks
      );
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", data.userId],
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
      await queryClient.cancelQueries({ queryKey: ["bookmarks", user?.id] });
      const previousBookmarks = queryClient.getQueryData([
        "bookmarks",
        user?.id,
      ]) as RecommendResponse<AreaBookmark>;

      const prevBookmarkData = previousBookmarks?.data;
      queryClient.setQueryData(
        ["bookmarks", user?.id],
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
        ["bookmarks", user?.id],
        context?.prevBookmarkData
      );
    },
    onSettled: ({ data }: any) => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", data.userId],
      });
    },
  });

  const isBookmarked = (areaId: number) =>
    bookmarks?.some((bookmark) => bookmark.areaId === areaId);

  return { isBookmarked, addBookmark, deleteBookmark };
};
