type Direction = "left" | "right";

type CategorySectionProps = {
  direction: Direction;
};

function CategorySection({ direction }: CategorySectionProps) {
  const roundedClasses =
    direction === "left"
      ? "rounded-tr-3xl rounded-br-3xl"
      : "rounded-tl-3xl rounded-bl-3xl ml-4";

  return (
    <section className="w-full">
      <div className={`w-[96%] h-[704px] bg-lime-300 ${roundedClasses}`}></div>
    </section>
  );
}

export default CategorySection;
