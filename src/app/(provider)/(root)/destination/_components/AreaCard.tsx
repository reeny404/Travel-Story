import CardForm from "@/components/Card/CardForm";
import CardType from "@/components/Card/CardType";
import ImageContainer from "@/components/Card/ImageContainer";

type AreaCardType = {
  title: string;
  description: string;
  rating: number;
  imageUrl: string;
};

function AreaCard({ title, description, rating, imageUrl }: AreaCardType) {
  return (
    <>
      <CardType type="home" title="할인하는 숙소" linkUrl="/" />
      <ImageContainer
        isTitle
        size="area"
        imageUrl="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg"
      />
      <CardForm
        intent="detail"
        title={title}
        description={description}
        rating={rating}
      />
    </>
  );
}

export default AreaCard;
