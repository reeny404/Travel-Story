import TravelStyle from "@/components/TravelStyle";

function MyPlanStyle() {
  return (
    <section className="px-4">
      <TravelStyle title="여행 테마가 무엇인가요?" category="theme" />
      <TravelStyle title="언제 떠나시나요?" category="season" />
      <TravelStyle title="누구와 떠나시나요?" category="travelMate" />
    </section>
  );
}

export default MyPlanStyle;
