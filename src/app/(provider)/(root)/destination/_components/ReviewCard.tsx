import CardForm from "@/components/Card/CardForm";
import CardType from "@/components/Card/CardType";
import ImageContainer from "@/components/Card/ImageContainer";

type ReviewCardProps = {
  title: string;
  description: string;
  rating: number;
  imageUrl: string;
};

function ReviewCard({ title, description, rating, imageUrl }: ReviewCardProps) {
  return (
    <>
      <CardType
        linkUrl="/"
        title="최고의 후기"
        type="thumsup"
        innerClassName="mt-5"
      />
      <div className="flex w-full items-center h-[100px] mt-5 ">
        <div className="w-1/3">
          <ImageContainer isTitle size="review" imageUrl={imageUrl} />
        </div>
        <div className="w-2/3">
          <CardForm
            title={title}
            description={description}
            intent="review"
            rating={rating}
          />
        </div>
      </div>
    </>
  );
}

export default ReviewCard;
