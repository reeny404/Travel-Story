import CardForm from "@/components/Card/CardForm";
import ImageContainer from "@/components/Card/ImageContainer";
// area ItemsPage가 있어야 될듯????
type AreaCardType = {
  title: string;
  description: string;
  rating: number;
  imageUrl: string;
  linkUrl: string;
};

function AreaCard({ title, description, rating, imageUrl }: AreaCardType) {
  return (
    <>
      <ImageContainer isTitle size="area" imageUrl={imageUrl} />
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
