import ImageFrame from "@/components/Frame/ImageFrame";
import Profile from "@/components/Frame/Profile";
import { Tables } from "@/types/supabase";

type props = { plan: Tables<"plan"> };

function Plan({ plan }: props) {
  const { title, imagesUrl, startDate, endDate } = plan;

  return (
    <div className="flex items-center p-4 bg-white shadow hover:shadow-md">
      <div className="w-20 h-20 bg-gray-200 flex items-center justify-center3">
        <ImageFrame
          src={imagesUrl}
          alt="일정 대표 사진"
          className="w-16 h-16"
        />
        {/* TODO 여기에 일정 사진?? 들어가는 건가? */}
      </div>
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">
          {startDate} - {endDate}
        </p>
        <div className="flex items-center mt-2 space-x-2">
          {/* TODO 현재 로그인한 사용자 profile 이미지 넣어주기 */}
          <Profile src={null} className="w-5 h-5" />
        </div>
      </div>
      <button className="ml-auto mb-auto">
        <ImageFrame
          src="/icon/ellipsisVertical.svg"
          alt="더보기"
          className="w-4 h-4"
        />
      </button>
    </div>
  );
}

export default Plan;
