import CardForm from "@/components/Card/CardForm";
import ImageContainer from "@/components/Card/ImageContainer";

type DetailCardProps = {
  title: string;
  description: string;
  imageUrl: string;
};

function DetailCard({ title, description, imageUrl }: DetailCardProps) {
  return (
    <>
      <ImageContainer isTitle size="detail" imageUrl={imageUrl || "/"} />
      <CardForm title={title} description={description} intent="detail" />
    </>
  );
}

export default DetailCard;
