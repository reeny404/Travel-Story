import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

type UnderBarProps = {
  handleBookmark?: () => void;
  handleAddPlan?: () => void;
};

function UnderBar({ handleBookmark, handleAddPlan }: UnderBarProps) {
  const supabase = createClient();
  const { data: userInfo } = useQuery({
    queryKey: ["user"],
    queryFn: () => supabase.auth.getUser(),
  });
  console.log("userInfo", userInfo);
  return (
    <div className="w-full h-10 px-3 flex gap-x-2 fixed bottom-0">
      <button
        onClick={handleBookmark}
        className="w-14 h-full bg-blue-500 border rounded-md"
      >
        북
      </button>
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
