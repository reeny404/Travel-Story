import ImageFrame from "@/components/Frame/ImageFrame";
import { Tables } from "@/types/supabase";

type props = { plan: Tables<"plan"> };

function Account({ plan }: props) {
  const { title, imagesUrl, startDate, endDate } = plan;

  return (
    <div className="p-3 space-x-4 flex items-center bg-white rounded-md shadow-plan hover:shadow-md">
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center">
          <h2 className="pb-1 text-lg font-semibold leading-6">
            {title} (가계부)
          </h2>
          <button className="ml-auto mb-auto">
            <ImageFrame
              src="/icon/ellipsisVertical.svg"
              alt="더보기"
              className="w-4 h-4"
            />
          </button>
        </div>
        <p className="text-sm text-gray-500 leading-5">
          {startDate} - {endDate}
        </p>
      </div>
    </div>
  );
}

export default Account;
