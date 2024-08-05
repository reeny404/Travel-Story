import CardType from "@/components/Card/CardType";
import ArchCardSlider from "@/components/Slider/ArchCardSlider";

function InitialSearchView() {
  return (
    <>
      <div className="flex justify-center items-center h-[290px]">
        검색어를 입력해주세요
      </div>
      <CardType title="추천 여행지" type="fire" />
      <ArchCardSlider spacing={12} slidesPerView={3.8} />
    </>
  );
}

export default InitialSearchView;
