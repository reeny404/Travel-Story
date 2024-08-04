import ImageFrame from "@/components/Frame/ImageFrame";
import Profile from "@/components/Frame/Profile";
import { Tables } from "@/types/supabase";

type props = { plan: Tables<"plan"> };

function Plan({ plan }: props) {
  const { title, imagesUrl, startDate, endDate } = plan;

  return (
    <div className="min-h-32 p-3 space-x-4 flex items-center bg-white rounded-md shadow-plan hover:shadow-md">
      <div className="w-24 h-full bg-gray-200 flex items-center justify-center rounded-lg">
        <ImageFrame
          src={imagesUrl}
          alt="plnaImg"
          className="w-24 min-h-32 aspect-4/5"
          round="lg"
        />
      </div>
      <div className="flex flex-col flex-1 py-3">
        <p className="flex justify-between items-center">
          <h2 className="pb-1 text-lg font-semibold leading-6">{title}</h2>
          <button className="ml-auto mb-auto">
            <ImageFrame
              src="/icon/ellipsisVertical.svg"
              alt="더보기"
              className="w-4 h-4"
            />
          </button>
        </p>
        <p className="mb-6 text-sm text-gray-500 leading-5">
          {startDate} - {endDate}
        </p>
        <div className="flex items-center space-x-2">
          {/* TODO 현재 로그인한 사용자 profile 이미지 넣어주기 */}
          <Profile src={null} className="w-9 h-9" />
        </div>
      </div>
    </div>
  );
}

export default Plan;
