import CardType from "@/components/Card/CardType";
import ArchCardSlider from "@/components/Slider/ArchCardSlider";

function InitialSearchView() {
  return (
    <section className="w-full mt-4">
      <div className="flex justify-center items-center h-[290px]">
        검색어를 입력해주세요
      </div>
      <CardType title="추천 여행지" />
      <ArchCardSlider spacing={12} slidesPerView={3.8} />
    </section>
  );
}

export default InitialSearchView;
