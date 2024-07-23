import CardForm from "@/components/Card/CardForm";
import ImageContainer from "@/components/Card/ImageContainer";

function IntroCard() {
  const mockAreaData = ["로마", "나폴리", "피렌체", "볼로냐", "베네치아"];

  return (
    <div className="w-[375px] h-full">
      <ImageContainer
        isTitle={true}
        title="ITALY"
        size="intro"
        imageUrl="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg"
      />
      <CardForm intent="intro" items={mockAreaData} />
    </div>
  );
}

export default IntroCard;
