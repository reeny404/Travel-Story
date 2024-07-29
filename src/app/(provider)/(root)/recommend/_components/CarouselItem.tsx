import CardForm from "@/components/Card/CardForm";
import ImageContainer from "@/components/Card/ImageContainer";

type CarouselItemType = {
  imageUrl: string;
  title: string;
  description: string;
};

function CarouselItem(item: CarouselItemType) {
  return (
    <>
      <div className="flex-none w-full ">
        <div className="flex flex-col relative">
          <ImageContainer isTitle size="area" imageUrl={item?.imageUrl!} />
          <CardForm
            intent="detail"
            title={item.title}
            description={item?.description!}
            linkUrl="/"
          />
        </div>
      </div>
    </>
  );
}

export default CarouselItem;
