import AreaCard from "../Cards/AreaCard";

type CarouselItemType = {
  imageUrl: string;
  title: string;
  description: string;
  linkUrl: string;
  id: number;
  rating: number;
};

function CarouselItem(item: CarouselItemType) {
  return (
    <>
      <div className="w-full">
        <AreaCard
          title={item.title}
          rating={item.rating}
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
