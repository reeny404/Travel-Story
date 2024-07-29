import CarouselItem from "./CarouselItem";

type CarouselListProps<T> = {
  items: T[];
  getDefaultProps: (item: T) => {
    description: string;
    imageUrl: string;
    title: string;
  };
};

function CarouselList<T>({ items, getDefaultProps }: CarouselListProps<T>) {
  return (
    <>
      {items?.map((item, idx) => {
        const { description, imageUrl, title } = getDefaultProps(item);
        return (
          <CarouselItem
            key={idx}
            description={description}
            imageUrl={imageUrl}
            title={title}
          />
        );
      })}
    </>
  );
}

export default CarouselList;
