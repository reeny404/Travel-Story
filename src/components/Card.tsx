import CardForm from "./CardForm";
import ImageContainer from "./ImageContainer";

//image 컨테이너 , text container, areaForm (intro, detail, recommend),

function Card() {
  const mockAreaData = ["로마", "나폴리", "피렌체", "볼로냐", "베네치아"];
  return (
    <div className="flex flex-col justify-center items-center">
      <ImageContainer
        isTitle
        size="small"
        imageUrl="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg"
      />
      <CardForm
        title="르네상스의 발상지, 예술과 낭만의 중심 이탈리아"
        description="여행지 소개 여행지 소개 여행지 소개 여행지 소개 여행지 소개 여행지 소개여행지 소개여행지 소개여행지 소개"
        intent="intro"
      />
      <hr />
      <ImageContainer
        isTitle={true}
        title="ITALY"
        size="small"
        imageUrl="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg"
      />
      <CardForm intent="detail" items={mockAreaData} />

      <div className="w-[134px] h-1 bg-black opacity-70 fixed bottom-3"></div>
    </div>
  );
}

export default Card;
