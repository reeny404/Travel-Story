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
      className={`w-full h-11 mt-8 py-[10px] sm:flex sm:items-center sm:gap-2 sm:py-3 sm:mb-2 md:mb-4 md:mt-12 lg:mt-16 ${isHidden ? "hidden" : ""} ${isTop ? "sm:mt-13" : "sm:mt-16"} ${className}`}
    >
      <h3 className="md:text-lg lg:text-xl font-medium">{title}</h3>
    </div>
  );
}

export default SearchPageTitle;
