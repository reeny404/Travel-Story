"use client";

import CountryButton from "@/components/CountryButton";
import { CONTINENTS } from "@/constants/continents";
import { COUNTRY_LIST } from "@/constants/country";
import useDrawerStore from "@/stores/drawer.store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SlideTagList from "../commons/TagList/SlideTagList";

const CONTINENT_LIST: Array<keyof typeof CONTINENTS> = [
  "아시아",
  "유럽",
  "남아메리카",
  "오세아니아",
  "북아메리카",
  "아프리카",
];

function TripList() {
  const router = useRouter();
  const { closeDrawer } = useDrawerStore();
  const [selectedTag, setSelectedTag] = useState<keyof typeof CONTINENTS>(
    CONTINENT_LIST[0]
  );

  const handleTagClick = (tag: keyof typeof CONTINENTS) => {
    setSelectedTag(tag);
  };

  const handleNavigateCountryPage = (id: number) => {
    router.push(`/recommend/country/${id}`);
    closeDrawer();
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
        {COUNTRY_LIST.filter(
          (country) => country.continent === selectedTag
        ).map((country) => (
          <li key={country.id}>
            <CountryButton
              size="sm"
              imgSize="sm"
              imgPath={country.imageUrl}
              alt={country.krName}
              countryName={country.krName}
              onClick={() => handleNavigateCountryPage(country.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TripList;
