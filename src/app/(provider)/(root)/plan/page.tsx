import SvgIcon from "@/components/commons/SvgIcon";
import MainLayout from "@/components/Layout/MainLayout";
import { DateUtil } from "@/utils/DateUtil";
import CreatePlanButton from "./_components/CreatePlanButton";
import PlanList from "./_components/PlanList";

export default function PlanListPage() {
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "내 여행 리스트",
        titleAlign: "center",
      }}
    >
      <div className="min-h-[calc(100dvh-52px)]">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg leading-6">
              {DateUtil.format("yyyy년 MM월 dd일", new Date())}
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-0.5 flex justify-center text-sm rounded-full bg-gray-150">
                {/* TODO 정렬 미구현 */}
                최신순
                <SvgIcon name="arrow-down" width={16} height={16} />
              </button>
            </div>
          </div>
          <PlanList />
        </div>
        <CreatePlanButton />
      </div>
    </MainLayout>
  );
}
