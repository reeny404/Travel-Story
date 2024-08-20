import ImageFrame from "@/components/Frame/ImageFrame";
import Profile from "@/components/Frame/Profile";
import { Plan as PlanType } from "@/types/plan";
import PlanEllipsisMenu from "./PlanEllipsisMenu";

type props = { plan: PlanType };

function Plan({ plan }: props) {
  const { title, imagesUrl, startDate, endDate } = plan;
  const img: string | null = imagesUrl ? imagesUrl[0] : null;

  return (
    <div className="min-h-32 p-3 space-x-4 flex items-center bg-white rounded-md shadow-default hover:shadow-md">
      <div className="w-24 h-full bg-gray-200 flex items-center justify-center rounded-lg">
        <ImageFrame
          src={img ?? "/plan/banner.jpg"}
          alt="thumbnail"
          className="w-24 min-h-32 aspect-4/5"
          round="lg"
        />
      </div>
      <div className="flex flex-col flex-1 py-3">
        <div className="flex justify-between items-center">
          <h2 className="flex-1 pb-1 text-lg font-semibold leading-6">
            {title}
          </h2>
          <PlanEllipsisMenu planId={plan.id} />
        </div>
        <p className="mb-6 text-sm text-gray-500 leading-5">
          {startDate} - {endDate}
        </p>
        <div className="flex items-center space-x-2">
          {/* TODO 현재 로그인한 사용자 profile 이미지 넣어주기 */}
          <Profile
            src="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/plan/profileSample.jpg"
            className="w-9 h-9"
          />
        </div>
      </div>
    </div>
  );
}

export default Plan;
