type SearchPageTitleProps = {
  title: string;
  className?: string;
  isHidden?: boolean;
  isTop?: boolean;
};

function SearchPageTitle({
  title,
  className = "",
  isHidden,
  isTop,
}: SearchPageTitleProps) {
  return (
    <div
      className={`w-full h-11 mt-8 py-[10px] md:flex md:items-center md:gap-2 md:py-3 md:mb-4 md:mt-12 lg:mt-16 ${isHidden ? "hidden" : ""} ${isTop ? "md:mt-13" : "md:mt-16"} ${className}`}
    >
      <h3 className="md:text-lg lg:text-xl font-medium">{title}</h3>
    </div>
  );
}

export default SearchPageTitle;
