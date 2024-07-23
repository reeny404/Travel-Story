import CardForm from "./CardForm";
import CardType from "./CardType";
import ImageContainer from "./ImageContainer";

//image 컨테이너 , text container, areaForm (intro, detail, recommend),

function Card() {
  const mockAreaData = ["로마", "나폴리", "피렌체", "볼로냐", "베네치아"];
  return (
    <div className="flex flex-col justify-center items-center">
      <ImageContainer
        isTitle
        size="detail"
        imageUrl="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg"
      />
      <CardForm
        title="르네상스의 발상지, 예술과 낭만의 중심 이탈리아"
        description="여행지 소개 여행지 소개 여행지 소개 여행지 소개 여행지 소개 여행지 소개여행지 소개여행지 소개여행지 소개"
        intent="detail"
      />
      <hr />
      <ImageContainer
        isTitle={true}
        title="ITALY"
        size="intro"
        imageUrl="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg"
      />
      <CardForm intent="intro" items={mockAreaData} />

      <CardType type="home" title="할인하는 숙소" linkUrl="/" />
      <ImageContainer
        isTitle
        size="recommend"
        imageUrl="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg"
      />
      <CardForm
        intent="detail"
        title="숙소 명"
        description="고대의 역사가 살아숨쉬는 도시"
        rating={4}
      />
      <div className="w-[134px] h-1 bg-black opacity-70 fixed bottom-3"></div>
    </div>
  );
}

export default Card;
