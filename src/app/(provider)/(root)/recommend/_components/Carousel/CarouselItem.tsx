import AreaCard from "../Cards/AreaCard";

type CarouselItemType = {
  imageUrl: string;
  title: string;
  description: string;
  linkUrl: string;
  id: number;
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
          id={item.id}
        />
      </div>
    </>
  );
}

export default CarouselItem;
