import CarouselItem from "./CarouselItem";

type CarouselListProps<T> = {
  items: T[];
  getDefaultProps: (item: T) => {
    description: string;
    imageUrl: string;
    title: string;
    linkUrl: string;
    id: number;
  };
};

function CarouselList<T>({ items, getDefaultProps }: CarouselListProps<T>) {
  return (
    <>
      {items?.map((item, idx) => {
        const { description, imageUrl, title, linkUrl, id } =
          getDefaultProps(item);
        return (
          <CarouselItem
            key={idx}
            id={id}
            linkUrl={linkUrl}
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
