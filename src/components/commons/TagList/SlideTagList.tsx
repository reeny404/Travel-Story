import { TagSliderProps } from "@/types/Slider";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import TagButton from "../TagButton";

type SlideTagListProps<T extends string> = {
  tagList: T[];
  onTagClick: (tag: T) => void;
} & TagSliderProps;

// spacing: 태그 간 간격
function SlideTagList<T extends string>({
  tagList,
  onTagClick,
  spacing,
}: SlideTagListProps<T>) {
  const [selectedTag, setSelectedTag] = useState<T>(tagList[0]);

  const handleTagClick = (tag: T) => {
    setSelectedTag(tag);
    onTagClick(tag);
  };

  return (
    <Swiper spaceBetween={spacing} slidesPerView="auto" grabCursor={true}>
      {tagList.map((tag, index) => (
        <SwiperSlide key={index} style={{ width: "auto" }}>
          <TagButton
            theme="primary"
            size="sm"
            isChecked={tag === selectedTag}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </TagButton>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SlideTagList;
