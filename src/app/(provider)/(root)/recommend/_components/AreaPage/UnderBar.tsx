import { api } from "@/apis/api";
import { AreaBookmark, RecommendResponse } from "@/types/Recommend";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { checkIsBookmarked } from "./_utils/checkIsBookmarked";

type UnderBarProps = {
  areaId: number;
  handleAddPlan?: () => void;
};

function UnderBar({ handleAddPlan, areaId }: UnderBarProps) {
  const userId = "80bf108c-63c1-43ce-b463-92b9a0915f0d";
  const { data: bookmarks } = useQuery<
    RecommendResponse<AreaBookmark[]>,
    AxiosError,
    AreaBookmark[]
  >({
    queryKey: ["bookmarks", userId],
    queryFn: () => api.bookmark.getBookmarks(userId),
    select: (data) => data.data,
  });
  // 유저 값이 내려오는 전역 상태가 존재하면 값 수정
  // 북마크 관련 함수 optimistic update 필수
  const { mutate: addBookmark } = useMutation({
    mutationFn: () =>
      api.bookmark.addBookmark({
        userId: "80bf108c-63c1-43ce-b463-92b9a0915f0d",
        areaId,
      }),
  });
  const { mutate: deleteBookmark } = useMutation({
    mutationFn: () =>
      api.bookmark.deleteBookmark({
        userId: "80bf108c-63c1-43ce-b463-92b9a0915f0d",
        areaId,
      }),
  });
  return (
    <div className="w-full h-10 px-3 flex gap-x-2 fixed bottom-0">
      {checkIsBookmarked(bookmarks!, areaId) ? (
        <button
          onClick={() => deleteBookmark()}
          className="w-14 h-full bg-blue-500 border rounded-md"
        >
          북X
        </button>
      ) : (
        <button
          onClick={() => addBookmark()}
          className="w-14 h-full bg-blue-500 border rounded-md"
        >
          북O
        </button>
      )}
      <button
        onClick={handleAddPlan}
        className="w-72 h-full bg-gray-300 border rounded-md"
      >
        내 여행에 추가
      </button>
    </div>
  );
}

export default UnderBar;
