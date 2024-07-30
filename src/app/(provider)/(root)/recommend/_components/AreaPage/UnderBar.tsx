import { useBookmarks } from "@/hooks/useBookmark";

type UnderBarProps = {
  areaId: number;
  handleAddPlan?: () => void;
};

function UnderBar({ handleAddPlan, areaId }: UnderBarProps) {
  const { isBookmarked, addBookmark, deleteBookmark } = useBookmarks(areaId);

  return (
    <div className="w-full h-10 px-3 flex gap-x-2 fixed bottom-0">
      {isBookmarked ? (
        <button
          onClick={() => deleteBookmark.mutate()}
          className="w-14 h-full bg-blue-500 border rounded-md"
        >
          북X
        </button>
      ) : (
        <button
          onClick={() => addBookmark.mutate()}
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
