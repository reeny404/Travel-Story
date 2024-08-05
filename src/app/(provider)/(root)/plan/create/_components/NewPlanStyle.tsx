import TravelStyle from "@/components/TravelStyle";
import { PlanInsertType } from "@/types/plan";

type NewPlanStyleProps = {
  data: PlanInsertType;
  setData: (data: PlanInsertType) => void;
};

function NewPlanStyle({ data: plan, setData }: NewPlanStyleProps) {
  // TODO 아직 DB 셋팅을 안해서 props 미사용한 채로 냅둠
  return (
    <section className="px-4">
      <TravelStyle title="여행 테마가 무엇인가요?" category="theme" />
      <TravelStyle title="언제 떠나시나요?" category="season" />
      <TravelStyle title="누구와 떠나시나요?" category="travelMate" />
    </section>
  );
}

export default NewPlanStyle;
