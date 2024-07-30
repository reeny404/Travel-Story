import AreaCard from "../Cards/AreaCard";

type CarouselItemType = {
  imageUrl: string;
  title: string;
  description: string;
  linkUrl: string;
};

function CarouselItem(item: CarouselItemType) {
  return (
    <>
      <div className="w-full">
        <AreaCard
          title={item.title}
          description={item.description}
          imageUrl={item.imageUrl}
          linkUrl={item.linkUrl}
        />
      </div>
    </>
  );
}

export default CarouselItem;
