import CardForm from "@/components/Card/CardForm";
import ImageContainer from "@/components/Card/ImageContainer";

function DetailCard() {
  return (
    <>
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
    </>
  );
}

export default DetailCard;
