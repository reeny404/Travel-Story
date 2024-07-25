import AreaCard from "../../_components/AreaCard";

function AreaDetailPage() {
  return (
    <div className="container overflow-x-hidden w-screen h-screen max-w-[375px] mx-auto flex-col">
      <AreaCard
        title="숙소 명"
        description="고대의 역사가 살아 숨쉬는 도시"
        rating={4}
        imageUrl="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg"
        linkUrl="/"
      />
    </div>
  );
}

export default AreaDetailPage;
