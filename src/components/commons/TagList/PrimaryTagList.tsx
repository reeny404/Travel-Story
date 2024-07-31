import { TagSliderProps } from "@/types/Slider";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import TagButton from "../TagButton";

type PrimaryTagListProps<T extends string> = {
  tagList: T[];
  onTagClick: (tag: T) => void;
} & TagSliderProps;

// spacing: 태그 간 간격, slidesPerView: 한 화면에 보일 태그의 개수
function PrimaryTagList<T extends string>({
  tagList,
  onTagClick,
  spacing,
  slidesPerView,
}: PrimaryTagListProps<T>) {
  const [selectedTag, setSelectedTag] = useState<T>(tagList[0]);

  const handleTagClick = (tag: T) => {
    setSelectedTag(tag);
    onTagClick(tag);
  };

  return (
    <Swiper
      spaceBetween={spacing}
      slidesPerView={slidesPerView}
      grabCursor={true}
    >
      <div className="flex gap-x-3">
        {tagList.map((tag, index) => (
          <SwiperSlide key={index}>
            <TagButton
              key={tag}
              theme="primary"
              size="sm"
              isChecked={tag === selectedTag}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </TagButton>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
}

export default PrimaryTagList;
