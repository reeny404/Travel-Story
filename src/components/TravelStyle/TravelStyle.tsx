import Icon from "@/components/commons/Icon";
import SelectButton from "../../app/(provider)/(root)/onboard/_components/SelectButton/SelectButton";

type Category = "theme" | "season" | "travelMate" | "country";
type SelectFormProps = {
  title: string;
  category: Category;
};

function TravelStyle({ title, category }: SelectFormProps) {
  const buttonMap: Record<Category, string[]> = {
    theme: [
      "힐링",
      "액티비티",
      "식도락",
      "쇼핑",
      "문화체험",
      "전시관람",
      "자연",
      "도심",
    ],
    season: ["봄", "여름", "가을", "겨울"],
    travelMate: [
      "혼자",
      "친구와",
      "연인과",
      "가족과",
      "부모님 모시고",
      "아이와",
      "반려동물과",
    ],
    country: [],
  };

  return (
    <div className="w-full mb-10">
      <h3 className="font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-[9px] w-full h-fit mt-4">
        {category === "country" ? (
          <div className="flex w-full rounded-lg bg-white pr-3">
            <Icon icon="search-black" />
            <input
              className="flex-grow placeholder:text-gray-300 outline-none"
              placeholder="국가를 검색하세요."
            />
          </div>
        ) : (
          buttonMap[category]?.map((list, index) => (
            <SelectButton
              key={index}
              text={list}
              category={category}
            ></SelectButton>
          ))
        )}
      </div>
    </div>
  );
}

export default TravelStyle;
