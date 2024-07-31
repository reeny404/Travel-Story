import CountryButton from "@/components/CountryButton";
import { CONTINENTS } from "@/constants/continents";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SlideTagList from "../commons/TagList/SlideTagList";

// 추후 db에서 가져올 값이라 따로 파일분리 하지 않았습니다.
const CONTINENT_LIST = Object.keys(CONTINENTS) as Array<
  keyof typeof CONTINENTS
>;

function TripList() {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<keyof typeof CONTINENTS>(
    CONTINENT_LIST[0]
  );

  const handleTagClick = (tag: keyof typeof CONTINENTS) => {
    setSelectedTag(tag);
  };

  return (
    <section className="flex flex-col gap-y-3 px-4 py-2">
      <div className="flex">
        <SlideTagList
          tagList={CONTINENT_LIST}
          onTagClick={handleTagClick}
          spacing={10}
        />
      </div>
      <h3 className="font-semibold">{selectedTag}</h3>
      <ul className="flex flex-wrap max-h-[400px] gap-y-3 overflow-y-auto no-scrollbar">
        {CONTINENTS[selectedTag].map((country) => (
          <li key={country}>
            <CountryButton
              size="sm"
              imgSize="sm"
              imgPath="/sampleImg.jpg"
              alt={country}
              countryName={country}
              onClick={() => router.push(`/recommend/country`)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TripList;
