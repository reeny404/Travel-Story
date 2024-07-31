import { LatLng } from "@/types/LatLng";
import Map from "./_components/Map";

const routes: LatLng[] = [
  { lat: 37.5363, lng: 126.977 },
  { lat: 37.3993, lng: 125.977 },
  { lat: 35.3393, lng: 126.977 },
  { lat: 36.3143, lng: 128.977 },
];

function PlanRoutePage() {
  // TODO schedule 의 위경도 목록을 가져오는 방식으로 변경해야 함

  return (
    <section>
      <Map locations={routes}></Map>
      <div>PlanRoutePage</div>
    </section>
  );
}

export default PlanRoutePage;
